import BaseController from './BaseController';
import { BASE_PAGE_SIZE } from '../constants';

export default class PhotoController extends BaseController {
	public async getPhotoList() {
		const { ctx, service } = this;

		try {
			const pageIndex = Number(ctx.query.pageIndex) || 1,
				pageSize = Number(ctx.query.pageSize) || BASE_PAGE_SIZE,
				albumId = ctx.query.albumId;

			if (!albumId) {
				this.clientError();
				return;
			}

			const result = await service.photo.getPhotoList({
				pageIndex,
				pageSize,
				albumId,
			});

			this.success({
				msg: '获取照片列表成功！',
				data: result,
			});
		} catch (e) {
			this.fail({
				msg: '获取照片列表失败！',
				error: e,
			});
		}
	}
}
