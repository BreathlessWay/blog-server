import { Service } from 'egg';
import * as JWT from 'jsonwebtoken';
import * as moment from 'moment';
import { createHash } from 'crypto';

import { CODE_EXPIRES_TIME, TOKEN_EXPIRES_TIME } from '../constants';

export default class LoginService extends Service {
	public async isRegister() {
		const { ctx } = this;
		const user = await ctx.model.User.find({ email: ctx.query.email });
		return user && user.length > 0;
	}

	public async sendCode({ email }: { email: string }) {
		const { ctx } = this;
		const md5 = createHash('md5');
		const code = ctx.helper.randomCode();
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
					code: md5.update(code).digest('hex'),
					code_expires: moment().add(CODE_EXPIRES_TIME, 'minute'),
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
		const md5 = createHash('md5');
		const user = await ctx.model.User.findOne({
			email,
			code: md5.update(code).digest('hex'),
		});
		let toke = '';
		if (user && user.code_expires > Date.now()) {
			await ctx.model.User.findOneAndUpdate(
				{
					email,
				},
				{
					$unset: {
						code: '',
						code_expires: '',
					},
				},
			);
			toke = JWT.sign({ email: user.email }, this.config.jwt.secret, {
				algorithm: 'HS256',
				expiresIn: TOKEN_EXPIRES_TIME,
			});
		}
		return toke;
	}
}
