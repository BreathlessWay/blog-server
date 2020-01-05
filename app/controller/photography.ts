import BaseController from './BaseController';
import { BASE_PAGE_SIZE } from '../constants';

export default class PhotographyController extends BaseController {
	public async getAlbumList() {
		const { ctx, service } = this;

		try {
			const pageSize = Number(ctx.query.pageSize) || BASE_PAGE_SIZE,
				pageIndex = Number(ctx.query.pageIndex) || 1;

			const data = await service.photography.getAlbumList({
				pageIndex,
				pageSize,
			});
			this.success({
				msg: '获取相册列表成功！',
				data,
			});
		} catch (e) {
			this.fail({
				msg: '获取相册列表失败！',
				error: e,
			});
		}
	}

	public async createAlbum() {
		const { ctx, service } = this;

		try {
			const { title, show } = ctx.request.body;

			if (!title) {
				this.clientError();
				return;
			}

			await service.photography.createAlbum({ title, show });

			this.success({
				msg: '创建相册成功！',
			});
		} catch (e) {
			this.fail({
				msg: '创建相册失败！',
				error: e,
			});
		}
	}
}
