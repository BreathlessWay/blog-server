import { Context } from 'egg';
import * as nodemailer from 'nodemailer';

export default {
	sendEmail(
		this: Context,
		{
			receiveEmail,
			code,
		}: {
			receiveEmail: string;
			code: number;
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
			from: '"BreathlessWay" <654560329@qq.com>', // sender address
			to: receiveEmail, // list of receivers
			subject: '博客管理后台验证码', // Subject line
			// 发送text或者html格式
			text: `您的登陆验证码是 ${code}`, // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				this.logger.error(error);
				return;
			}
			this.logger.info(info);
		});
	},
};
