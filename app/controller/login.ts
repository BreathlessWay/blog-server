import { Controller } from 'egg';

export default class LoginController extends Controller {
	public async getCode() {
		const { ctx } = this;
		const { email } = ctx.query;
		const code = ctx.helper.random(1000, 9999);
		ctx.sendEmail({ receiveEmail: email, code });
		ctx.body = '验证码发送成功！';
	}
}
