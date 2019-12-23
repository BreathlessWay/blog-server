import BaseController from './BaseController';

export default class LoginController extends BaseController {
	public async getCode() {
		const { ctx, service } = this;
		try {
			const { email } = ctx.query;
			if (!ctx.helper.isEmail(email)) {
				this.fail({ msg: '不是正确的邮箱账号！' });
				return;
			}
			const isRegister = await service.login.isRegister();
			if (!isRegister) {
				this.success({ msg: '该账号尚未注册！' });
				return;
			}
			const code = ctx.helper.random(1000, 9999);
			await ctx.sendEmail({
				receiveEmail: email,
				data: {
					text: `您的登陆验证码是 ${code}`,
				},
			});
			this.success({ msg: '验证码发送成功！' });
		} catch (e) {
			this.fail({
				code: 500,
				msg: '验证码发送失败！',
			});
		}
	}
}
