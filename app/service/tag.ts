import { Service } from 'egg';

export type TagItemType = {
	name: string;
	count: number;
	show: boolean;
	_id?: string;
};

export default class TagService extends Service {
	public async getTagList() {
		const tagList = await this.ctx.model.Tag.find();
		return tagList.map(item => {
			const { _id, name, show, createdAt, updatedAt, count } = item;
			return {
				count,
				_id,
				name,
				show,
				createdAt,
				updatedAt,
			};
		});
	}

	public async editTagList(list) {
		const { ctx } = this;

		if (!list.length) {
			await ctx.model.Tag.deleteMany({});
		} else {
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
					item =>
						!updateListIds.includes(item._id.toString()) &&
						!item.article.length,
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
		}

		return this.getTagList();
	}
}
