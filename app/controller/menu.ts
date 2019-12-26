import BaseController from './BaseController';

export default class MenuController extends BaseController {
	public async getMenu() {
		try {
			const { service } = this;
			const menuResult = await service.menu.getMenuList();
			this.success({
				msg: '获取菜单项成功',
				data: {
					result: menuResult,
				},
			});
		} catch (e) {
			this.fail({
				msg: '获取菜单项失败！',
				error: e,
			});
		}
	}

	public async updateMenu() {
		try {
			const { service } = this;
			const updateResult = await service.menu.updateMenu();
			this.success({
				msg: '更新菜单项成功',
				data: {
					result: updateResult,
				},
			});
		} catch (e) {
			this.fail({
				msg: '更新菜单项失败！',
				error: e,
			});
		}
	}
}
