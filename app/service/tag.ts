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
		const list: Array<TagItemType> = ctx.request.body;

		const updateList: Array<Partial<TagItemType>> = [],
			addList: Array<Omit<TagItemType, '_id'>> = [];
		let deleteList: Array<Partial<TagItemType>> = [];

		const listResult = await ctx.model.Tag.find();
		if (listResult && listResult.length) {
			list.forEach(item => {
				if (item._id) {
					const _item = listResult.find(t => t._id === item._id);
					_item && updateList.push(_item);
				} else {
					addList.push(item);
				}
			});
			const updateListIds = updateList.map(item => item._id);
			deleteList = listResult.filter(item => !updateListIds.includes(item._id));
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

		return await ctx.model.Tag.bulkWrite([
			...updateBatch,
			...deleteBatch,
			...addBatch,
		]);
	}
}
