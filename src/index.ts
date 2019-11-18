import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
	ctx.body = 'hello blog';
});

app.listen(3000);
