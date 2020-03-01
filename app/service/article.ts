import { Service } from 'egg';

export default class ArticleService extends Service {
	public async getCanEditArticleCount({ userId, ids }) {
		const { ctx } = this;
		const matchArticleCount = await ctx.model.Article.countDocuments({
			_id: { $in: ids },
			userId,
		});
		return matchArticleCount === ids.length;
	}

	public async getArticleList({
		keyword,
		startTime,
		endTime,
		status,
		tags,
		pageIndex,
		pageSize,
	}) {
		const { ctx } = this,
			params: any = {};
		if (startTime && endTime) {
			params.createdAt = {
				$gte: Number(startTime),
				$lte: Number(endTime),
			};
		}
		if (tags && Array.isArray(tags) && tags.length) {
			params.tags = { $all: tags };
		}

		if (keyword) {
			const reg = {
				$regex: new RegExp(keyword, 'ig'),
			};
			params.$or = [
				{ title: reg },
				{ intro: reg },
				{ richTextHtml: reg },
				{ markdown: reg },
			];
		}
		if (status !== void 0) {
			params.status = status;
		}

		const allShowCount = await ctx.model.Article.find({
				status: 1,
			}).countDocuments(),
			count = await ctx.model.Article.find(params).countDocuments(),
			list = await ctx.model.Article.find(params)
				.sort({ top: -1, createdAt: -1 })
				.skip((pageIndex - 1) * pageSize)
				.limit(pageSize)
				.populate('tags', 'name show');

		return {
			allShowCount,
			count,
			list,
		};
	}

	public async createArticle({ userId, detail }) {
		const { ctx } = this;
		const tags = detail.tags;
		const data = new ctx.model.Article({ ...detail, userId });
		const res = await data.save();
		await ctx.model.Tag.updateMany(
			{ _id: { $in: tags } },
			{ $push: { article: res._id } },
		);
	}

	public async getArticleDetail(id) {
		const { ctx } = this;

		return ctx.model.Article.findByIdAndUpdate(
			id,
			{ $inc: { visit: 1 } },
			{ new: true },
		).populate('tags', 'name show');
	}

	public async updateArticleDetail({ userId, id, detail }) {
		const { ctx } = this;

		await ctx.model.Article.findOneAndUpdate(
			{ _id: id, userId },
			{ $set: detail },
		);
		const tags = detail.tags;
		if (Array.isArray(tags)) {
			await ctx.model.Tag.updateMany({}, { $pull: { article: id } });
			await ctx.model.Tag.updateMany(
				{
					_id: { $in: tags },
				},
				{
					$push: { article: id },
				},
			);
		}
	}

	public async deleteArticle({ userId, id }) {
		const { ctx } = this;
		await ctx.model.Article.findOneAndRemove({
			_id: id,
			userId,
		});
		await ctx.model.Tag.updateMany({}, { $pull: { article: id } });
	}

	public async batchUpdateArticle({ userId, ids, status }) {
		const { ctx } = this;

		await ctx.model.Article.countDocuments({
			_id: { $in: ids },
			userId,
		});
		await ctx.model.Article.updateMany(
			{ _id: { $in: ids }, userId },
			{ $set: { status } },
		);
	}

	public async batchDeleteArticle({ userId, ids }) {
		const { ctx } = this;

		await ctx.model.Article.countDocuments({
			_id: { $in: ids },
			userId,
		});
		await ctx.model.Article.deleteMany({ _id: { $in: ids } });
		const tagList = await ctx.model.Tag.find({}).then(res => {
			return res.map(item => {
				item.article = item.article.filter(v => !ids.includes(v.toString()));
				return item.save();
			});
		});
		await Promise.all(tagList);
	}
}
