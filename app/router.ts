import { Application } from 'egg';

export default (app: Application) => {
	const { controller, router } = app;

	router.get('/', controller.home.index);

	router.post('/', controller.home.create);

	router.get('news', '/news/:id', controller.news.list);
};
