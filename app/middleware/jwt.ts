import * as JWT from 'jsonwebtoken';
import { Context } from 'egg';
import { RequestMethod } from '../constants/requestMethod';

export default (options: { secret: string; whileList: string[] }): any => {
	return async (ctx: Context, next) => {
		// 拿到传会数据的header 中的token值
		const token = ctx.request.header.authorization;
		const method = ctx.method.toLowerCase();
		// 当前请求时get请求，执行接下来的中间件
		if (method === RequestMethod.GET) {
			await next();
			return;
		}
		// 当前token值不存在的时候
		if (!token) {
			if (options.whileList.includes(ctx.path)) {
				await next();
			} else {
				ctx.handleError({
					msg: '尚未登录，请先登录！',
				});
				return;
			}
			return;
		}
		// 当前token值存在
		try {
			// 验证当前token
			const decode = JWT.verify(token, options.secret) as {
				email: string;
				expire: number;
			};
			if (!decode || !decode.email) {
				ctx.handleError({
					msg: '没有权限！',
				});
				return;
			}
			if (Date.now() - decode.expire > 0) {
				ctx.handleError({
					msg: '登陆已过期，请重新登录！',
				});
				return;
			}
			const user = await ctx.model.User.find({
				email: decode.email,
			});
			if (user) {
				await next();
			} else {
				ctx.handleError({
					msg: '用户信息验证失败，请重新登录！',
				});
				return;
			}
		} catch (e) {
			ctx.handleError({
				code: 500,
				msg: e.message,
			});
		}
	};
};
