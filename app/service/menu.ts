import { Service } from 'egg';
import { baseRoute } from '../constants/menu';

export default class MenuService extends Service {
	public async getMenuList() {
		const { ctx } = this;
		const menuList = await ctx.model.Menu.find().sort({ sort: 1 });
		if (menuList && menuList.length) {
			return menuList;
		}
		return await this.createMenu();
	}

	public async createMenu() {
		const { ctx } = this;
		return ctx.model.Menu.insertMany(baseRoute);
	}

	public async updateMenu() {
		const { ctx } = this;
		const list = ctx.request.body.list;
		const allUpdate = list.map(item =>
			ctx.model.Menu.findByIdAndUpdate(item._id, { $set: item }, { new: true }),
		);
		return Promise.all(allUpdate);
	}
}
