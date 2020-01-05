import { Service } from 'egg';

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

	public async createCatFigure(data) {
		const { ctx } = this;
		const item = new ctx.model.CatFigure(data);
		await item.save();
	}

	public async deleteCatFigure(id) {
		const { ctx } = this;

		return ctx.model.CatFigure.findOneAndRemove({ _id: id, show: false });
	}

	public async updateCatFigure({ id, data }) {
		const { ctx } = this;
		await ctx.model.CatFigure.updateMany({}, { show: false });
		return ctx.model.CatFigure.findByIdAndUpdate(id, {
			$set: data,
		});
	}

	// 猫图片列表
	public async getCatList({ pageIndex, pageSize }) {
		const { ctx } = this;

		const count = await ctx.model.CatList.countDocuments(),
			list = await ctx.model.CatList.find()
				.skip((pageIndex - 1) * pageSize)
				.limit(pageSize);

		return {
			count,
			list,
		};
	}

	public async createCatList(list) {
		const { ctx } = this;
		return ctx.model.CatList.insertMany(list);
	}

	public async updateCatInfo({ id, data }) {
		const { ctx } = this;

		return ctx.model.CatList.findByIdAndUpdate(id, { $set: data });
	}

	public async deleteCatItem(id) {
		const { ctx } = this;

		return ctx.model.CatList.findByIdAndRemove(id);
	}

	public async batchUpdateCatInfo({ ids, show }) {
		const { ctx } = this;

		return ctx.model.CatList.updateMany(
			{ _id: { $in: ids } },
			{ $set: { show } },
		);
	}

	public async batchDeleteCatItem(ids) {
		const { ctx } = this;

		return ctx.model.CatList.deleteMany({ _id: { $in: ids } });
	}
}
