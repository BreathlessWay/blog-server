import BaseController from './BaseController';

export default class LoginController extends BaseController {
	public async getCode() {
		const { ctx, service } = this;
		try {
			const { email } = ctx.query;
			if (!ctx.helper.isEmail(email)) {
				this.clientError({ msg: '不是正确的邮箱账号！' });
				return;
			}
			const isRegister = await service.login.isRegister();
			if (!isRegister) {
				this.fail({ code: 200, msg: '该账号尚未注册！' });
				return;
			}
			await service.login.sendCode({ email });
			this.success({ msg: '验证码发送成功！' });
		} catch (e) {
			this.fail({
				msg: '验证码发送失败！',
				error: e,
			});
		}
	}

	public async register() {
		const { ctx, service } = this;

		try {
			const email = ctx.request.body.email;
			if (!ctx.helper.isEmail(email)) {
				this.clientError({ msg: '不是正确的邮箱账号！' });
				return;
			}
			await service.login.register();
			this.success({
				msg: '注册成功！',
			});
		} catch (e) {
			this.fail({
				msg: '注册失败！',
				error: e,
			});
		}
	}

	public async login() {
		const { ctx, service } = this;

		try {
			const { email, code } = ctx.request.body;
			if (!ctx.helper.isEmail(email) || !code) {
				this.clientError();
				return;
			}

			const token = await service.login.login();
			if (token) {
				this.success({
					msg: '登录成功！',
					data: {
						token,
					},
				});
			} else {
				this.clientError({
					msg: '验证码错误！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '登录失败！',
				error: e,
			});
		}
	}

	public async validLogin() {
		const { ctx } = this;

		try {
			const res = await ctx.valid();
			if (res.success) {
				this.success({
					msg: res.msg,
				});
			} else {
				this.fail({
					code: res.code,
					msg: res.msg,
					error: new Error(res.msg),
				});
			}
		} catch (e) {
			this.fail({
				msg: e.message,
				error: e,
			});
		}
	}
}
