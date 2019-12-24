import { Context } from 'egg';
import { RequestMethod } from '../constants/requestMethod';
import * as Qs from 'qs';

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
		try {
			await ctx.valid();
			await next();
		} catch (e) {
			const { code = 500, msg = e.message } = Qs.parse(e.message);
			ctx.handleError({
				code,
				msg,
				error: e,
			});
		}
	};
};
