export default () => {
	return async function notFoundHandler(ctx, next) {
		await next();
		if (ctx.status === 404 && !ctx.body) {
			if (ctx.acceptJSON) {
				ctx.body = { error: '访问路径不存在！' };
			} else {
				ctx.body = '<h1>访问路径不存在！</h1>';
			}
		}
	};
};
