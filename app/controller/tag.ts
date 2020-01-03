import BaseController from './BaseController';

export default class TagCController extends BaseController {
	public async getTagList() {
		const { service } = this;

		try {
			const tagList = await service.tag.getTagList();
			this.success({
				msg: '获取标签列表成功！',
				data: {
					list: tagList,
				},
			});
		} catch (e) {
			this.fail({
				msg: '获取标签列表失败！',
				error: e,
			});
		}
	}

	public async editTagList() {
		const { ctx, service } = this;

		try {
			const list = ctx.request.body.list;
			if (!list || !Array.isArray(list)) {
				this.clientError();
				return;
			}
			const tagList = await service.tag.editTagList();
			this.success({
				msg: '更新标签列表成功！',
				data: {
					list: tagList,
				},
			});
		} catch (e) {
			this.fail({
				msg: '更新标签列表失败！',
				error: e,
			});
		}
	}
}
