import { Context } from 'egg';
import * as nodemailer from 'nodemailer';
import * as JWT from 'jsonwebtoken';
import * as Qs from 'qs';
import { JWT_SECRET } from '../constants';

const context = {
	sendEmail(
		this: Context,
		{
			receiveEmail,
			data,
		}: {
			receiveEmail: string;
			data: {
				text?: string;
				html?: string;
			};
		},
	) {
		if (!this.helper.isEmail(receiveEmail)) {
			throw new Error('不是正确的邮箱账号！');
		}

		const transporter = nodemailer.createTransport({
			service: 'QQ',
			auth: {
				user: '654560329@qq.com', //你的邮箱
				// 这里密码不是qq密码，是你设置的smtp授权码
				pass: 'newrkcjjbmfxbbjj',
			},
		});

		const mailOptions = {
			from: `"博客管理后台" <654560329@qq.com>`, // sender address
			to: receiveEmail, // list of receivers
			subject: '博客管理后台验证码', // Subject line
			// 发送text或者html格式
			...data,
		};

		// send mail with defined transport object
		return new Promise((resolve, reject) => {
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					this.logger.error(error);
					reject(error);
				}
				this.logger.info(info);
				resolve(info);
			});
		});
	},
	handleError(
		this: Context,
		{
			code = 401,
			msg,
			error,
		}: {
			code?: number;
			msg: string;
			error?: Error;
		},
	) {
		this.status = Number(code);
		this.body = {
			success: false,
			msg: msg,
		};
		this.logger.error(error || msg);
	},
	async valid(this: Context) {
		const token = this.request.header.authorization;
		if (token) {
			const decode = JWT.verify(token.split(' ')[1], JWT_SECRET) as {
				email: string;
				exp: number;
			};

			if (!decode || !decode.email) {
				throw new Error(
					Qs.stringify({
						code: 401,
						msg: '没有权限！',
					}),
				);
			}

			if (Date.now() > decode.exp * 1000) {
				throw new Error(
					Qs.stringify({
						code: 401,
						msg: '登陆已过期，请重新登录！',
					}),
				);
			}

			const user = await this.model.User.find({
				email: decode.email,
			});
			if (!user) {
				throw new Error(
					Qs.stringify({
						code: 401,
						msg: '用户信息验证失败，请重新登录！',
					}),
				);
			}
		} else {
			throw new Error(
				Qs.stringify({
					code: 401,
					msg: 'token不存在！',
				}),
			);
		}
	},
};

export default context;
