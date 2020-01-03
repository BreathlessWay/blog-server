import BaseController from './BaseController';

export default class MenuController extends BaseController {
	public async getMenu() {
		const { service, success, fail } = this;

		try {
			const menuResult = await service.menu.getMenuList();
			success({
				msg: '获取菜单项成功',
				data: {
					list: menuResult,
				},
			});
		} catch (e) {
			fail({
				msg: '获取菜单项失败！',
				error: e,
			});
		}
	}

	public async updateMenu() {
		const { ctx, service, paramsError, success, fail } = this;

		try {
			const list = ctx.request.body.list;

			if (!list || !Array.isArray(list)) {
				paramsError();
				return;
			}

			const menuResult = await service.menu.updateMenu();
			success({
				msg: '更新菜单项成功',
				data: {
					list: menuResult,
				},
			});
		} catch (e) {
			fail({
				msg: '更新菜单项失败！',
				error: e,
			});
		}
	}
}
