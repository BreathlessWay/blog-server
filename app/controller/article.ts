import BaseController from './BaseController';
import { BASE_PAGE_SIZE } from '../constants';
import * as Qs from 'qs';

export default class ArticleController extends BaseController {
	public async getArticleList() {
		const { service, ctx } = this;
		try {
			let {
				keyword,
				startTime,
				endTime,
				status,
				tags,
				pageIndex,
				pageSize,
			} = Qs.parse(ctx.querystring);

			pageIndex = Number(pageIndex) || 1;
			pageSize = Number(pageSize) || BASE_PAGE_SIZE;

			if (isNaN(pageIndex) || isNaN(pageSize)) {
				this.clientError();
				return;
			}

			const articleList = await service.article.getArticleList({
				keyword,
				startTime,
				endTime,
				status,
				tags,
				pageIndex,
				pageSize,
			});
			this.success({
				msg: '获取文章列表成功！',
				data: articleList,
			});
		} catch (e) {
			this.fail({
				msg: '获取文章列表失败！',
				error: e,
			});
		}
	}

	public async getArticleDetail() {
		const { ctx, service } = this;

		try {
			const id = ctx.params.id;

			if (!id || !id.trim()) {
				this.clientError();
				return;
			}

			const detail = await service.article.getArticleDetail(id);
			if (detail) {
				this.success({
					msg: '获取文章详情成功！',
					data: detail,
				});
			} else {
				this.clientError({
					msg: '文章不存在！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '获取文章详情失败！',
				error: e,
			});
		}
	}

	public async createArticle() {
		const { ctx, service, userId } = this;

		try {
			const detail = ctx.request.body.detail;

			if (!detail) {
				this.clientError();
				return;
			}

			await service.article.createArticle({ userId, detail });

			this.success({
				msg: '新建文章成功！',
			});
		} catch (e) {
			this.fail({
				msg: '新建文章失败！',
				error: e,
			});
		}
	}

	public async updateArticle() {
		const { ctx, service, userId } = this;

		try {
			const id = ctx.params.id,
				detail = ctx.request.body.detail;

			if (!id || !detail) {
				this.clientError();
				return;
			}

			const hasRight = await service.article.getCanEditArticleCount({
				userId,
				ids: [id],
			});

			if (!hasRight) {
				this.clientError({
					code: 403,
					msg: '没有修改该文章的权限！',
				});
				return;
			}

			await service.article.updateArticleDetail({
				userId,
				id,
				detail,
			});
			this.success({
				msg: '更新文章成功！',
			});
		} catch (e) {
			this.fail({
				msg: '更新文章失败！',
				error: e,
			});
		}
	}

	public async deleteArticle() {
		const { ctx, service, userId } = this;

		try {
			const id = ctx.params.id;

			if (!id) {
				this.clientError();
				return;
			}

			const hasRight = await service.article.getCanEditArticleCount({
				userId,
				ids: [id],
			});

			if (!hasRight) {
				this.clientError({
					code: 403,
					msg: '没有删除该文章的权限！',
				});
				return;
			}

			await service.article.deleteArticle({ userId, id });
			this.success({
				msg: '删除文章成功！',
			});
		} catch (e) {
			this.fail({
				msg: '删除文章失败！',
				error: e,
			});
		}
	}

	public async batchUpdateArticle() {
		const { ctx, service, userId } = this;

		try {
			const ids = ctx.request.body.ids;

			if (!ids || !Array.isArray(ids) || !ids.length) {
				this.clientError();
				return;
			}

			const hasRight = await service.article.getCanEditArticleCount({
				userId,
				ids,
			});

			if (!hasRight) {
				this.clientError({
					code: 403,
					msg: '部分文章没有修改权限！',
				});
				return;
			}

			await service.article.batchUpdateArticle({
				userId,
				ids,
				status,
			});
			this.success({
				msg: '批量更新文章成功！',
			});
		} catch (e) {
			this.fail({
				msg: '批量更新文章失败！',
				error: e,
			});
		}
	}

	public async batchDeleteArticle() {
		const { ctx, service, userId } = this;

		try {
			const ids = JSON.parse(ctx.query.ids);

			if (!ids || !Array.isArray(ids) || !ids.length) {
				this.clientError();
				return;
			}

			const hasRight = await service.article.getCanEditArticleCount({
				userId,
				ids,
			});

			if (!hasRight) {
				this.clientError({
					code: 403,
					msg: '部分文章没有删除权限！',
				});
				return;
			}

			await service.article.batchDeleteArticle({
				userId,
				ids,
			});
			this.success({
				msg: '删除文章成功！',
			});
		} catch (e) {
			this.fail({
				msg: '删除文章失败！',
				error: e,
			});
		}
	}
}
