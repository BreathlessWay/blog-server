import { Application } from 'egg';

export default (app: Application) => {
	const { controller, router } = app;
	// app.middleware.jwt()
	router.get('/valid', controller.login.validLogin);

	router.get('/code', controller.login.getCode);

	router.post('/register', controller.login.register);

	router.post('/login', controller.login.login);

	router.get('/soup', controller.soup.index);

	router.get('news', '/news/:id', controller.news.list);
};
