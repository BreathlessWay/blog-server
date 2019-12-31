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

		const allUpdate = list.map(item => {
			return {
				updateOne: {
					filter: { _id: item._id },
					// If you were using the MongoDB driver directly, you'd need to do
					// `update: { $set: { title: ... } }` but mongoose adds $set for
					// you.
					update: item,
				},
			};
		});

		await ctx.model.Menu.bulkWrite(allUpdate);
		return this.getMenuList();
	}
}
