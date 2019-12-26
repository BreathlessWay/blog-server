import BaseController from './BaseController';

export default class LoginController extends BaseController {
	public async getCode() {
		const { ctx, service } = this;
		try {
			const { email } = ctx.query;
			if (!ctx.helper.isEmail(email)) {
				this.fail({ code: 200, msg: '不是正确的邮箱账号！' });
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
		try {
			const {
				service: { login },
			} = this;
			await login.register();
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
		try {
			const { service } = this;
			const token = await service.login.login();
			if (token) {
				this.success({
					msg: '登录成功！',
					data: {
						token,
					},
				});
			} else {
				this.fail({
					code: 200,
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
		try {
			const { ctx } = this;
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
