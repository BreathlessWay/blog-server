import { Service } from 'egg';
import { baseRoute } from '../constants/menu';

export default class MenuService extends Service {
	public async getMenuList() {
		const { ctx } = this;
		return (await ctx.model.Menu.findOne()) || (await this.createMenu());
	}

	public async createMenu() {
		const { ctx } = this;
		const menu = new ctx.model.Menu({
			list: baseRoute,
		});
		await menu.save();
		return menu;
	}

	public async updateMenu() {
		const { ctx } = this;
		const list = ctx.request.body.list;
		return ctx.model.Menu.findOneAndUpdate(
			{},
			{
				list,
			},
			{
				new: true,
			},
		);
	}
}
