import BaseController from './BaseController';

import { BASE_PAGE_SIZE } from '../constants';

export default class AlbumController extends BaseController {
	public async getAlbumList() {
		const { ctx, service } = this;

		try {
			const pageSize = Number(ctx.query.pageSize) || BASE_PAGE_SIZE,
				pageIndex = Number(ctx.query.pageIndex) || 1;

			const data = await service.album.getAlbumList({
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

	public async getAlbumInfo() {
		const { ctx, service } = this;

		try {
			const id = ctx.params.id;

			if (!id) {
				this.clientError();
				return;
			}

			const info = await service.album.getAlbumInfo(id);
			if (info) {
				this.success({
					msg: '获取相册信息成功',
					data: info,
				});
			} else {
				this.clientError({
					msg: '相册不存在！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '获取相册信息失败！',
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

			await service.album.createAlbum({ title, show });

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

	public async updateAlbum() {
		const { ctx, service } = this;

		try {
			const data = ctx.request.body,
				id = ctx.params.id;

			if (!data.title || !id) {
				this.clientError();
				return;
			}

			await service.album.updateAlbum({ id, data });

			this.success({
				msg: '更新相册成功！',
			});
		} catch (e) {
			this.fail({
				msg: '更新相册失败！',
				error: e,
			});
		}
	}

	public async deleteAlbum() {
		const { ctx, service } = this;

		try {
			const id = ctx.params.id;

			if (!id) {
				this.clientError();
				return;
			}

			await service.album.deleteAlbum({ id });

			this.success({
				msg: '删除相册成功！',
			});
		} catch (e) {
			this.fail({
				msg: '删除相册失败！',
				error: e,
			});
		}
	}

	public async batchUpdateAlbum() {
		const { ctx, service } = this;

		try {
			const { ids, data } = ctx.request.body;

			if (!ids || !Array.isArray(ids) || !ids.length) {
				this.clientError();
				return;
			}

			await service.album.batchUpdateAlbum({ ids, data });

			this.success({
				msg: '批量修改相册成功！',
			});
		} catch (e) {
			this.fail({
				msg: '批量修改相册失败！',
				error: e,
			});
		}
	}

	public async batchDeleteAlbum() {
		const { ctx, service } = this;

		try {
			const ids = JSON.parse(ctx.query.ids);
			console.log(ids);
			if (!ids || !Array.isArray(ids) || !ids.length) {
				this.clientError();
				return;
			}

			await service.album.batchDeleteAlbum({ ids });

			this.success({
				msg: '批量删除相册成功！',
			});
		} catch (e) {
			this.fail({
				msg: '批量删除相册失败！',
				error: e,
			});
		}
	}
}
