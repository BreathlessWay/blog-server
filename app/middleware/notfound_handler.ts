export default () => {
	return async function notFoundHandler(ctx, next) {
		await next();
		if (ctx.status === 404 && !ctx.body) {
			ctx.handleError({
				code: 404,
				msg: '访问路径不存在！',
				error: new Error('访问路径不存在！'),
			});
		}
	};
};
