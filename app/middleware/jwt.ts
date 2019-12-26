import { Context } from 'egg';
import { RequestMethod } from '../constants/requestMethod';

export default (): any => {
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
			ctx.handleError({
				msg: '尚未登录，请先登录！',
			});
			return;
		}
		try {
			const res = await ctx.valid();
			if (res.success) {
				await next();
			} else {
				ctx.handleError({
					code: res.code,
					msg: res.msg,
					error: new Error(res.msg),
				});
			}
		} catch (e) {
			ctx.handleError({
				msg: e.message,
				error: e,
			});
		}
	};
};
