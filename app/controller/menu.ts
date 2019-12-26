import BaseController from './BaseController';
import { baseRoute } from '../constants/menu';

export default class MenuController extends BaseController {
	public async getMenu() {
		try {
			const { ctx } = this;
			let menuResult = await ctx.model.Menu.findOne();
			if (menuResult) {
				this.success({
					msg: '获取菜单项成功',
					data: {
						result: menuResult,
					},
				});
			} else {
				const menu = new ctx.model.Menu({
					list: baseRoute,
				});
				await menu.save();
				this.success({
					msg: '获取菜单项成功',
					data: {
						result: menu,
					},
				});
			}
		} catch (e) {
			this.fail({
				msg: '获取菜单项失败！',
				error: e,
			});
		}
	}
}
