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
				.populate('tags');

		return {
			count,
			list,
		};
	}

	public async createArticle() {
		const { ctx } = this,
			detail = ctx.request.body.detail;
		const tags = detail.tags;
		const data = new ctx.model.Article(detail);
		const res = await data.save();
		await ctx.model.Tag.updateMany(
			{ _id: { $in: tags } },
			{ $push: { article: res._id } },
		);
	}

	public async getArticleDetail() {
		const { ctx } = this,
			id = ctx.params.id;

		return ctx.model.Article.findById(id);
	}

	public async updateArticleDetail() {
		const { ctx } = this,
			id = ctx.params.id,
			detail = ctx.request.body.detail;
		console.log(detail);
		return ctx.model.Article.findByIdAndUpdate(id, { $set: detail });
	}

	public async deleteArticle() {
		const { ctx } = this;
		const id = ctx.params.id;
		// model采用remove
		// query用delete
		return ctx.model.Article.findByIdAndRemove(id);
	}
}
