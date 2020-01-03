import BaseController from './BaseController';

export default class ArticleController extends BaseController {
	public async getArticleList() {
		const { service, success, fail } = this;
		try {
			const articleList = await service.article.getArticleList();
			success({
				msg: '获取文章列表成功！',
				data: articleList,
			});
		} catch (e) {
			fail({
				msg: '获取文章列表失败！',
				error: e,
			});
		}
	}

	public async getArticleDetail() {
		const { ctx, service, success, fail, paramsError } = this;

		try {
			const id = ctx.params.id;

			if (!id || !id.trim()) {
				paramsError();
				return;
			}

			const detail = await service.article.getArticleDetail();
			if (detail) {
				success({
					msg: '获取文章详情成功！',
					data: detail,
				});
			} else {
				fail({
					msg: '文章不存在！',
				});
			}
		} catch (e) {
			fail({
				msg: '获取文章详情失败！',
				error: e,
			});
		}
	}

	public async createArticle() {
		const { ctx, service, success, fail, paramsError, userId } = this;

		try {
			const data = ctx.request.body.detail;

			if (!data) {
				paramsError();
				return;
			}

			await service.article.createArticle(userId);

			success({
				msg: '新建文章成功！',
			});
		} catch (e) {
			fail({
				msg: '新建文章失败！',
				error: e,
			});
		}
	}

	public async updateArticle() {
		const { ctx, service, success, fail, paramsError, userId } = this;

		try {
			const id = ctx.params.id,
				detail = ctx.request.body.detail;

			if (!id || !detail) {
				paramsError();
				return;
			}

			const updateResult = await service.article.updateArticleDetail(userId);
			if (updateResult) {
				success({
					msg: '更新文章成功！',
				});
			} else {
				fail({
					code: 403,
					msg: '没有修改该文章的权限！',
				});
			}
		} catch (e) {
			fail({
				msg: '更新文章失败！',
				error: e,
			});
		}
	}

	public async deleteArticle() {
		const { ctx, service, success, fail, paramsError, userId } = this;

		try {
			const id = ctx.params.id;

			if (!id) {
				paramsError();
				return;
			}

			const deleteResult = await service.article.deleteArticle(userId);
			if (deleteResult) {
				success({
					msg: '删除文章成功！',
				});
			} else {
				fail({
					code: 403,
					msg: '没有删除该文章的权限！',
				});
			}
		} catch (e) {
			fail({
				msg: '删除文章失败！',
				error: e,
			});
		}
	}

	public async batchUpdateArticle() {
		const { ctx, service, success, fail, paramsError, userId } = this;

		try {
			const data = ctx.request.body.ids;

			if (!data || !Array.isArray(data) || !data.length) {
				paramsError();
				return;
			}

			const batchUpdateResult = await service.article.batchUpdateArticle(
				userId,
			);
			if (batchUpdateResult) {
				success({
					msg: '批量更新文章成功！',
				});
			} else {
				fail({
					code: 403,
					msg: '部分文章没有修改权限！',
				});
			}
		} catch (e) {
			fail({
				msg: '批量更新文章失败！',
				error: e,
			});
		}
	}

	public async batchDeleteArticle() {
		const { ctx, service, success, fail, paramsError, userId } = this;

		try {
			const data = ctx.request.body.ids;

			if (!data || !Array.isArray(data) || !data.length) {
				paramsError();
				return;
			}

			const batchDeleteResult = await service.article.batchDeleteArticle(
				userId,
			);

			if (batchDeleteResult) {
				success({
					msg: '删除文章成功！',
				});
			} else {
				fail({
					code: 403,
					msg: '部分文章没有删除权限！',
				});
			}
		} catch (e) {
			fail({
				msg: '删除文章失败！',
				error: e,
			});
		}
	}
}
