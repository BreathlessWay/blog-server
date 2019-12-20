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
				ctx.throw(401, '未登录，请先登录！');
			}
			return;
		}
		// 当前token值存在
		try {
			// 验证当前token
			const decode = JWT.verify(token, options.secret) as {
				userName: string;
				expire: number;
			};
			if (!decode || !decode.userName) {
				ctx.throw(401, '没有权限！');
			}
			if (Date.now() - decode.expire > 0) {
				ctx.throw(401, '登陆已过期，请重新登录！');
			}
			const user = await ctx.model.User.find({
				userName: decode.userName,
			});
			if (user) {
				await next();
			} else {
				ctx.throw('401', '用户信息验证失败！');
			}
		} catch (e) {
			ctx.logger.error(e);
		}
	};
};
