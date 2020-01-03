import BaseController from './BaseController';
import { MAX_FIGURE_COUNT } from '../constants';

export default class CatController extends BaseController {
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
}
