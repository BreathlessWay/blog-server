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

		await ctx.model.Article.findByIdAndUpdate(id, { $set: detail });
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

	public async deleteArticle() {
		const { ctx } = this;
		const id = ctx.params.id;
		await ctx.model.Article.findByIdAndRemove(id);
		await ctx.model.Tag.updateMany({}, { $pull: { article: id } });
	}

	public async batchUpdateArticle() {
		const { ctx } = this;
		const { ids, status } = ctx.request.body;

		return ctx.model.Article.updateMany(
			{ _id: { $in: ids } },
			{ $set: { status } },
		);
	}

	public async batchDeleteArticle() {
		const { ctx } = this;
		const { ids } = ctx.request.body;
		await ctx.model.Article.deleteMany({ _id: { $in: ids } });
		const tagList = await ctx.model.Tag.find({});

		tagList.forEach(item => {
			const { article } = item;
			ids.forEach(id => {
				if (article.includes(id)) {
					item.updateOne({
						$pull: {
							article: id,
						},
					});
				}
			});
		});
	}
}
