import { Service } from 'egg';

import { BASE_PAGE_SIZE } from '../constants';

export default class CatService extends Service {
	// 猫卡通
	public async catFigureCount() {
		const { ctx } = this;
		return ctx.model.CatFigure.countDocuments();
	}

	public async getCatFigure() {
		const { ctx } = this;
		return ctx.model.CatFigure.find();
	}

	public async createCatFigure() {
		const { ctx } = this,
			data = ctx.request.body;
		const item = new ctx.model.CatFigure(data);
		await item.save();
	}

	public async deleteCatFigure() {
		const { ctx } = this,
			id = ctx.params.id;

		return ctx.model.CatFigure.findOneAndRemove({ _id: id, show: false });
	}

	public async updateCatFigure() {
		const { ctx } = this,
			id = ctx.params.id,
			data = ctx.request.body;
		await ctx.model.CatFigure.updateMany({}, { show: false });
		return ctx.model.CatFigure.findByIdAndUpdate(id, {
			$set: data,
		});
	}

	// 猫图片列表
	public async getCatList() {
		const { ctx } = this;
		const pageIndex = Number(ctx.query.pageIndex) || 1,
			pageSize = Number(ctx.query.pageSize) || BASE_PAGE_SIZE;

		const count = await ctx.model.CatList.countDocuments(),
			list = await ctx.model.CatList.find()
				.skip((pageIndex - 1) * pageSize)
				.limit(pageSize);

		return {
			count,
			list,
		};
	}

	public async createCatList() {
		const { ctx } = this,
			{ list } = ctx.request.body;

		return ctx.model.CatList.insertMany(list);
	}

	public async updateCatInfo() {
		const { ctx } = this,
			id = ctx.params.id,
			data = ctx.request.body;

		return ctx.model.CatList.findByIdAndUpdate(id, { $set: data });
	}

	public async deleteCatItem() {
		const { ctx } = this,
			id = ctx.params.id;

		return ctx.model.CatList.findByIdAndRemove(id);
	}

	public async batchUpdateCatInfo() {
		const { ctx } = this,
			{ ids, show } = ctx.request.body;

		return ctx.model.CatList.updateMany(
			{ _id: { $in: ids } },
			{ $set: { show } },
		);
	}

	public async batchDeleteCatItem() {
		const { ctx } = this,
			{ ids } = ctx.query;

		return ctx.model.CatList.deleteMany({ _id: { $in: JSON.parse(ids) } });
	}
}
