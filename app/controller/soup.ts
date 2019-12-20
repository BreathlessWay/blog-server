import { Controller } from 'egg';

export default class SoupController extends Controller {
	public async index() {
		try {
			const { service, ctx } = this;
			ctx.body = await service.soup.getSoup();
		} catch (e) {}
	}
}
