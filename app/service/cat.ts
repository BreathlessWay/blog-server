import { Service } from 'egg';

export default class CatService extends Service {
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
}
