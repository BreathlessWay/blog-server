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
			const { ctx, service } = this;
			const data = ctx.request.body.detail;
			await service.article.createArticle();
			if (!data) {
				this.paramsError();
				return;
			}

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
			const { ctx } = this;
			const id = ctx.params.id;

			if (!id) {
				this.paramsError();
				return;
			}

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
		try {
			const { ctx } = this;
			const id = ctx.params.id;

			if (!id) {
				this.paramsError();
				return;
			}

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
		try {
			const { ctx } = this;
			const data = ctx.request.body;

			if (!data || !Array.isArray(data.ids) || !data.ids.length) {
				this.paramsError();
				return;
			}

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
		try {
			const { ctx } = this;
			const data = ctx.request.body;

			if (!data || !Array.isArray(data.ids) || !data.ids.length) {
				this.paramsError();
				return;
			}

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
