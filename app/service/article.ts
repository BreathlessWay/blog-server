import { Service } from 'egg';
import * as Qs from 'qs';

export default class ArticleService extends Service {
	public async getArticleList() {
		const { ctx } = this;
		const {
			keyword,
			startTime,
			endTime,
			status,
			tags,
			pageIndex = 1,
			pageSize = 10,
		} = Qs.parse(ctx.querystring);
		const params: any = {};
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

		const count = await ctx.model.Article.find(params).countDocuments(),
			list = await ctx.model.Article.find(params)
				.skip((pageIndex - 1) * pageSize)
				.limit(Number(pageSize))
				.populate('tags', 'name');

		return {
			count,
			list,
		};
	}

	public async createArticle(userId) {
		const { ctx } = this,
			detail = ctx.request.body.detail;
		const tags = detail.tags;
		const data = new ctx.model.Article({ ...detail, userId });
		const res = await data.save();
		await ctx.model.Tag.updateMany(
			{ _id: { $in: tags } },
			{ $push: { article: res._id } },
		);
	}

	public async getArticleDetail() {
		const { ctx } = this,
			id = ctx.params.id;

		return ctx.model.Article.findByIdAndUpdate(
			id,
			{ $inc: { visit: 1 } },
			{ new: true },
		);
	}

	public async updateArticleDetail(userId) {
		const { ctx } = this,
			id = ctx.params.id,
			detail = ctx.request.body.detail;

		const res = await ctx.model.Article.findOneAndUpdate(
			{ _id: id, userId },
			{ $set: detail },
		);
		if (res) {
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
		return res;
	}

	public async deleteArticle(userId) {
		const { ctx } = this;
		const id = ctx.params.id;
		const res = await ctx.model.Article.findOneAndRemove({
			_id: id,
			userId,
		});
		if (res) {
			await ctx.model.Tag.updateMany({}, { $pull: { article: id } });
		}
		return res;
	}

	public async batchUpdateArticle(userId) {
		const { ctx } = this;
		const { ids, status } = ctx.request.body;

		const matchArticle = await ctx.model.Article.find({
			_id: { $in: ids },
			userId,
		});
		if (matchArticle && matchArticle.length === ids.length) {
			return ctx.model.Article.updateMany(
				{ _id: { $in: ids }, userId },
				{ $set: { status } },
			);
		}
		return null;
	}

	public async batchDeleteArticle(userId) {
		const { ctx } = this;
		const { ids } = ctx.request.body;
		const matchArticle = await ctx.model.Article.find({
			_id: { $in: ids },
			userId,
		});
		if (matchArticle && matchArticle.length === ids.length) {
			await ctx.model.Article.deleteMany({ _id: { $in: ids } });
			const tagList = await ctx.model.Tag.find({}).then(res => {
				return res.map(item => {
					item.article = item.article.filter(v => !ids.includes(v.toString()));
					return item.save();
				});
			});
			return await Promise.all(tagList);
		}
		return null;
	}
}
