import { Controller } from 'egg';

export default class LoginController extends Controller {
	public async getCode() {
		try {
			const { ctx } = this;
			const { email } = ctx.query;
			const code = ctx.helper.random(1000, 9999);
			ctx.sendEmail({ receiveEmail: email, code });
		} catch (e) {}
	}
}
