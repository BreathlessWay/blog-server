import { Service } from 'egg';

export type TagItemType = {
	name: string;
	count: number;
	show: boolean;
	_id?: string;
};

export default class TagService extends Service {
	public async getTagList() {
		return this.ctx.model.Tag.find();
	}

	public async editTagList() {
		const { ctx } = this;
		const list: Array<TagItemType> = ctx.request.body.list;

		const updateList: Array<Partial<TagItemType>> = [],
			addList: Array<Omit<TagItemType, '_id'>> = [];
		let deleteList: Array<Partial<TagItemType>> = [];

		const listResult = (await ctx.model.Tag.find()) || [];
		list.forEach(item => {
			if (item._id) {
				listResult.forEach(t => {
					if (t._id.toString() === item._id) {
						updateList.push(item);
					}
				});
			} else {
				addList.push(item);
			}
		});
		const updateListIds = updateList.map(item => item._id);
		if (listResult && listResult.length) {
			deleteList = listResult.filter(
				item => !updateListIds.includes(item._id.toString()),
			);
		}
		const updateBatch = updateList.map(item => {
			return {
				updateOne: {
					filter: { _id: item._id },
					update: item,
				},
			};
		});

		const deleteBatch = deleteList.map(item => {
			return {
				deleteOne: {
					filter: { _id: item._id },
				},
			};
		});

		const addBatch = addList.map(item => {
			return {
				insertOne: {
					document: item,
				},
			};
		});

		await ctx.model.Tag.bulkWrite([
			...updateBatch,
			...deleteBatch,
			...addBatch,
		]);
		return this.getTagList();
	}
}