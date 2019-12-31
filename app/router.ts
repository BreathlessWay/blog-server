import { Application } from 'egg';

export default (app: Application) => {
	const { controller, router } = app;

	router.get('/valid', controller.login.validLogin);

	router.get('/code', controller.login.getCode);

	router.post('/register', controller.login.register);

	router.post('/login', controller.login.login);

	router.get('/menu', controller.menu.getMenu);

	router.put('/menu', app.middleware.jwt(), controller.menu.updateMenu);

	router.get('/user', controller.user.getUserDetail);

	router.put('/user', app.middleware.jwt(), controller.user.updateUserDetail);

	router.get('/tags', controller.tag.getTagList);

	router.post('/tags', app.middleware.jwt(), controller.tag.editTagList);

	router.get('/article', controller.article.getArticleList);

	router.get('/article/:id', controller.article.getArticleDetail);

	router.post(
		'/article',
		app.middleware.jwt(),
		controller.article.createArticle,
	);

	router.delete(
		'/article/:id',
		app.middleware.jwt(),
		controller.article.deleteArticle,
	);

	router.put(
		'/article/:id',
		app.middleware.jwt(),
		controller.article.updateArticle,
	);

	router.put(
		'/batch/update/article',
		app.middleware.jwt(),
		controller.article.batchUpdateArticle,
	);

	router.put(
		'/batch/delete/article',
		app.middleware.jwt(),
		controller.article.batchDeleteArticle,
	);

	router.post('/upload', app.middleware.jwt(), controller.upload.uploadFile);

	router.get('/soup', controller.soup.index);

	router.get('news', '/news/:id', controller.news.list);
};
