import { Service } from 'egg';
import * as JWT from 'jsonwebtoken';

export default class LoginService extends Service {
	public async isRegister() {
		const { ctx } = this;
		const user = await ctx.model.User.find({ email: ctx.query.email });
		return user && user.length > 0;
	}

	public async sendCode({ email }: { email: string }) {
		const { ctx } = this;
		const code = ctx.helper.random(1000, 9999);
		await ctx.sendEmail({
			receiveEmail: email,
			data: {
				text: `您的登陆验证码是 ${code}`,
			},
		});
		await ctx.model.User.findOneAndUpdate(
			{
				email,
			},
			{
				$set: {
					code,
				},
			},
		);
	}

	public async register() {
		const { ctx } = this;
		const email = ctx.request.body.email;
		const user = new ctx.model.User({
			email,
		});
		await user.save();
		await this.sendCode({ email });
	}

	public async login() {
		const { ctx } = this;
		const { email, code } = ctx.request.body;
		const user = await ctx.model.User.findOne({ email, code });
		if (user) {
			await ctx.model.User.findOneAndUpdate(
				{
					email,
				},
				{
					$unset: {
						code: '',
					},
				},
			);
			return JWT.sign({ user: user.email }, this.config.jwt.secret, {
				expiresIn: 60,
			});
		}
		return '';
	}
}
