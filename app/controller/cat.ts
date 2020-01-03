import BaseController from './BaseController';
import { MAX_FIGURE_COUNT } from '../constants';

export default class CatController extends BaseController {
	// 猫卡通
	public async getCatFigure() {
		const { service } = this;

		try {
			const list = await service.cat.getCatFigure();

			this.success({
				msg: '获取猫卡通图成功！',
				data: {
					list,
				},
			});
		} catch (e) {
			this.fail({
				msg: '获取猫卡通图失败！',
				error: e,
			});
		}
	}

	public async createCatFigure() {
		const { ctx, service } = this;

		try {
			const { url } = ctx.request.body;

			if (!url) {
				this.clientError();
				return;
			}

			const count = await service.cat.catFigureCount();
			if (count === MAX_FIGURE_COUNT) {
				this.clientError({
					msg: `图片最多${MAX_FIGURE_COUNT}张！`,
				});
				return;
			}

			await service.cat.createCatFigure();
			const list = await service.cat.getCatFigure();

			this.success({
				msg: '新增猫卡通图成功！',
				data: {
					list,
				},
			});
		} catch (e) {
			this.fail({
				msg: '新增猫卡通图失败！',
				error: e,
			});
		}
	}

	public async deleteCatFigure() {
		const { ctx, service } = this;

		try {
			const id = ctx.params.id;
			if (!id) {
				this.clientError();
				return;
			}
			const deleteResult = await service.cat.deleteCatFigure();

			if (deleteResult) {
				this.success({
					msg: '删除猫卡通图成功！',
					data: {
						list: [],
					},
				});
			} else {
				this.clientError({
					msg: '不可删除使用中的图片！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '删除猫卡通图失败！',
				error: e,
			});
		}
	}

	public async updateCatFigure() {
		const { ctx, service } = this;

		try {
			const id = ctx.params.id,
				{ url } = ctx.request.body;
			if (!id || !url) {
				this.clientError();
				return;
			}

			await service.cat.updateCatFigure();

			this.success({
				msg: '更新猫卡通图成功！',
			});
		} catch (e) {
			this.fail({
				msg: '更新猫卡通图失败！',
				error: e,
			});
		}
	}

	// 猫图列表
	public async getCatList() {
		const { service } = this;

		try {
			const data = await service.cat.getCatList();

			this.success({
				msg: '获取图片列表成功！',
				data,
			});
		} catch (e) {
			this.fail({
				msg: '获取图片列表失败！',
				error: e,
			});
		}
	}

	public async createCatList() {
		const { ctx, service } = this;

		try {
			const { list } = ctx.request.body;

			if (!list || !Array.isArray(list) || !list.length) {
				this.clientError();
				return;
			}

			await service.cat.createCatList();
			this.success({
				msg: '新增图片成功！',
			});
		} catch (e) {
			this.fail({
				msg: '新增图片失败！',
				error: e,
			});
		}
	}

	public async updateCatInfo() {
		const { ctx, service } = this;

		try {
			const id = ctx.params.id,
				data = ctx.request.body;

			if (!id || !Object.keys(data).length) {
				this.clientError();
				return;
			}

			await service.cat.updateCatInfo();

			this.success({
				msg: '更新图片信息成功！',
			});
		} catch (e) {
			this.fail({
				msg: '更新图片信息失败！',
				error: e,
			});
		}
	}

	public async deleteCatItem() {
		const { ctx, service } = this;

		try {
			const id = ctx.params.id;

			if (!id) {
				this.clientError();
				return;
			}

			await service.cat.deleteCatItem();

			this.success({
				msg: '删除图片成功！',
			});
		} catch (e) {
			this.fail({
				msg: '删除图片失败！',
				error: e,
			});
		}
	}

	public async batchChangeCatInfo() {
		const { ctx, service } = this;

		try {
			const { ids } = ctx.request.body;

			if (!ids || !Array.isArray(ids) || !ids.length) {
				this.clientError();
				return;
			}

			await service.cat.batchUpdateCatInfo();

			this.success({
				msg: '批量更新图片信息成功！',
			});
		} catch (e) {
			this.fail({
				msg: '批量更新图片信息失败！',
				error: e,
			});
		}
	}

	public async batchDeleteCatItem() {
		const { ctx, service } = this;

		try {
			const { ids } = ctx.query;
			if (!ids) {
				this.clientError();
				return;
			}

			await service.cat.batchDeleteCatItem();

			this.success({
				msg: '批量删除图片成功！',
			});
		} catch (e) {
			this.fail({
				msg: '批量删除图片失败！',
				error: e,
			});
		}
	}
}
