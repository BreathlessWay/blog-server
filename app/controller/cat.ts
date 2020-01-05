import BaseController from './BaseController';
import { BASE_PAGE_SIZE, MAX_FIGURE_COUNT } from '../constants';

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
			const data = ctx.request.body;

			if (!data.url) {
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

			await service.cat.createCatFigure(data);
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
			const deleteResult = await service.cat.deleteCatFigure(id);

			if (deleteResult) {
				this.success({
					msg: '删除猫卡通图成功！',
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
				data = ctx.request.body;
			if (!id || !data.url) {
				this.clientError();
				return;
			}

			await service.cat.updateCatFigure({ id, data });

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
		const { service, ctx } = this;

		try {
			const pageIndex = Number(ctx.query.pageIndex) || 1,
				pageSize = Number(ctx.query.pageSize) || BASE_PAGE_SIZE;

			const data = await service.cat.getCatList({ pageIndex, pageSize });

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

			await service.cat.createCatList(list);
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

			await service.cat.updateCatInfo({ id, data });

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

			await service.cat.deleteCatItem(id);

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
			const { ids, show } = ctx.request.body;

			if (!ids || !Array.isArray(ids) || !ids.length) {
				this.clientError();
				return;
			}

			await service.cat.batchUpdateCatInfo({ ids, show });

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
			const ids = JSON.parse(ctx.query.ids);
			if (!ids || !Array.isArray(ids) || !ids.length) {
				this.clientError();
				return;
			}

			await service.cat.batchDeleteCatItem(ids);

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
