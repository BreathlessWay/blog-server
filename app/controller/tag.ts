import BaseController from './BaseController';

export default class TagCController extends BaseController {
	public async getTagList() {
		const { success, service, fail } = this;

		try {
			const tagList = await service.tag.getTagList();
			success({
				msg: '获取标签列表成功！',
				data: {
					list: tagList,
				},
			});
		} catch (e) {
			fail({
				msg: '获取标签列表失败！',
				error: e,
			});
		}
	}

	public async editTagList() {
		const { ctx, success, service, fail, paramsError } = this;

		try {
			const list = ctx.request.body.list;
			if (!list || !Array.isArray(list)) {
				paramsError();
				return;
			}
			const tagList = await service.tag.editTagList();
			success({
				msg: '更新标签列表成功！',
				data: {
					list: tagList,
				},
			});
		} catch (e) {
			fail({
				msg: '更新标签列表失败！',
				error: e,
			});
		}
	}
}
