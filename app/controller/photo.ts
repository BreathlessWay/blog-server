import BaseController from './BaseController';
import { BASE_PAGE_SIZE } from '../constants';

export default class PhotoController extends BaseController {
	public async getPhotoList() {
		const { ctx, service } = this;

		try {
			let { pageIndex, pageSize } = ctx.query;

			pageIndex = Number(pageIndex) || 1;
			pageSize = Number(pageSize) || BASE_PAGE_SIZE;

			const albumId = ctx.params.albumId;

			if (isNaN(pageIndex) || isNaN(pageSize) || !albumId) {
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

	public async createPhoto() {
		const { ctx, service } = this;

		try {
			const { list } = ctx.request.body,
				albumId = ctx.params.albumId;

			if (!list || !Array.isArray(list) || !list.length || !albumId) {
				this.clientError();
				return;
			}

			await service.photo.createPhoto({ list, albumId });

			this.success({
				msg: '添加照片成功！',
			});
		} catch (e) {
			this.fail({
				msg: '添加照片失败！',
				error: e,
			});
		}
	}

	public async updatePhotoInfo() {
		const { ctx, service } = this;

		try {
			const albumId = ctx.params.albumId,
				id = ctx.params.id,
				detail = ctx.request.body;

			if (!albumId || !Object.keys(detail).length || !id) {
				this.clientError();
				return;
			}

			await service.photo.updatePhotoInfo({ detail, albumId, id });

			this.success({
				msg: '修改照片信息成功！',
			});
		} catch (e) {
			this.fail({
				msg: '修改照片信息失败！',
				error: e,
			});
		}
	}

	public async deletePhoto() {
		const { ctx, service } = this;

		try {
			const { albumId, id } = ctx.params;

			if (!albumId || !id) {
				this.clientError();
				return;
			}

			await service.photo.deletePhoto({ albumId, id });

			this.success({
				msg: '删除照片成功！',
			});
		} catch (e) {
			this.fail({
				msg: '删除照片失败！',
				error: e,
			});
		}
	}

	public async batchUpdatePhotoInfo() {
		const { ctx, service } = this;

		try {
			const { ids, show } = ctx.request.body,
				albumId = ctx.params.albumId;

			if (!ids || !Array.isArray(ids) || !ids.length || !albumId) {
				this.clientError();
				return;
			}

			await service.photo.batchUpdatePhotoInfo({ ids, show, albumId });

			this.success({
				msg: '批量修改照片成功！',
			});
		} catch (e) {
			this.fail({
				msg: '批量修改照片失败！',
				error: e,
			});
		}
	}

	public async batchDeletePhoto() {
		const { ctx, service } = this;

		try {
			let { ids } = ctx.query,
				albumId = ctx.params.albumId;

			if (!ids || !albumId) {
				this.clientError();
				return;
			}

			ids = JSON.parse(ids);

			if (!Array.isArray(ids) || !ids.length) {
				this.clientError();
				return;
			}

			await service.photo.batchDeletePhoto({ albumId, ids });

			this.success({
				msg: '批量删除照片成功！',
			});
		} catch (e) {
			this.fail({
				msg: '批量删除照片失败！',
				error: e,
			});
		}
	}
}
