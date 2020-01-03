import BaseController from './BaseController';

export default class ArticleController extends BaseController {
	public async getArticleList() {
		try {
			const articleList = await this.service.article.getArticleList();
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
		try {
			const { ctx, service } = this;
			const id = ctx.params.id;

			if (!id || !id.trim()) {
				this.paramsError();
				return;
			}

			const detail = await service.article.getArticleDetail();
			if (detail) {
				this.success({
					msg: '获取文章详情成功！',
					data: detail,
				});
			} else {
				this.fail({
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
		try {
			const { ctx, service, userId } = this;
			const data = ctx.request.body.detail;

			if (!data) {
				this.paramsError();
				return;
			}

			await service.article.createArticle(userId);

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
		try {
			const { ctx, service, userId } = this;
			const id = ctx.params.id,
				detail = ctx.request.body.detail;

			if (!id || !detail) {
				this.paramsError();
				return;
			}

			const updateResult = await service.article.updateArticleDetail(userId);
			if (updateResult) {
				this.success({
					msg: '更新文章成功！',
				});
			} else {
				this.fail({
					code: 403,
					msg: '没有修改该文章的权限！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '更新文章失败！',
				error: e,
			});
		}
	}

	public async deleteArticle() {
		try {
			const { ctx, service, userId } = this;
			const id = ctx.params.id;

			if (!id) {
				this.paramsError();
				return;
			}

			const deleteResult = await service.article.deleteArticle(userId);
			if (deleteResult) {
				this.success({
					msg: '删除文章成功！',
				});
			} else {
				this.fail({
					code: 403,
					msg: '没有删除该文章的权限！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '删除文章失败！',
				error: e,
			});
		}
	}

	public async batchUpdateArticle() {
		try {
			const { ctx, service, userId } = this;
			const data = ctx.request.body.ids;

			if (!data || !Array.isArray(data) || !data.length) {
				this.paramsError();
				return;
			}

			const batchUpdateResult = await service.article.batchUpdateArticle(
				userId,
			);
			if (batchUpdateResult) {
				this.success({
					msg: '批量更新文章成功！',
				});
			} else {
				this.fail({
					code: 403,
					msg: '部分文章没有修改权限！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '批量更新文章失败！',
				error: e,
			});
		}
	}

	public async batchDeleteArticle() {
		try {
			const { ctx, service, userId } = this;
			const data = ctx.request.body.ids;

			if (!data || !Array.isArray(data) || !data.length) {
				this.paramsError();
				return;
			}

			const batchDeleteResult = await service.article.batchDeleteArticle(
				userId,
			);

			if (batchDeleteResult) {
				this.success({
					msg: '删除文章成功！',
				});
			} else {
				this.fail({
					code: 403,
					msg: '部分文章没有删除权限！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '删除文章失败！',
				error: e,
			});
		}
	}
}
