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

	router.delete(
		'/batch/delete/article',
		app.middleware.jwt(),
		controller.article.batchDeleteArticle,
	);

	router.get('/cat/figure', controller.cat.getCatFigure);

	router.post(
		'/cat/figure',
		app.middleware.jwt(),
		controller.cat.createCatFigure,
	);

	router.put(
		'/cat/figure/:id',
		app.middleware.jwt(),
		controller.cat.updateCatFigure,
	);

	router.delete(
		'/cat/figure/:id',
		app.middleware.jwt(),
		controller.cat.deleteCatFigure,
	);

	router.get('/cat/list', controller.cat.getCatList);

	router.post('/cat/list', app.middleware.jwt(), controller.cat.createCatList);

	router.put(
		'/cat/list/:id',
		app.middleware.jwt(),
		controller.cat.updateCatInfo,
	);

	router.delete(
		'/cat/list/:id',
		app.middleware.jwt(),
		controller.cat.deleteCatItem,
	);

	router.put(
		'/cat/list',
		app.middleware.jwt(),
		controller.cat.batchChangeCatInfo,
	);

	router.delete(
		'/cat/list',
		app.middleware.jwt(),
		controller.cat.batchDeleteCatItem,
	);

	router.get('/album/list', controller.album.getAlbumList);

	router.get('/album/:id', controller.album.getAlbumInfo);

	router.post('/album', app.middleware.jwt(), controller.album.createAlbum);

	router.put('/album/:id', app.middleware.jwt(), controller.album.updateAlbum);

	router.put(
		'/album/cover/:albumId/:id',
		app.middleware.jwt(),
		controller.album.setAlbumCover,
	);

	router.delete(
		'/album/:id',
		app.middleware.jwt(),
		controller.album.deleteAlbum,
	);

	router.put(
		'/batch/update/album',
		app.middleware.jwt(),
		controller.album.batchUpdateAlbum,
	);

	router.delete(
		'/batch/delete/album',
		app.middleware.jwt(),
		controller.album.batchDeleteAlbum,
	);

	router.get('/photo/list/:albumId', controller.photo.getPhotoList);

	router.post(
		'/photo/:albumId',
		app.middleware.jwt(),
		controller.photo.createPhoto,
	);

	router.put(
		'/photo/:albumId/:id',
		app.middleware.jwt(),
		controller.photo.updatePhotoInfo,
	);

	router.delete(
		'/photo/:albumId/:id',
		app.middleware.jwt(),
		controller.photo.deletePhoto,
	);

	router.put(
		'/batch/update/photo/:albumId',
		app.middleware.jwt(),
		controller.photo.batchUpdatePhotoInfo,
	);

	router.delete(
		'/batch/delete/photo/:albumId',
		app.middleware.jwt(),
		controller.photo.batchDeletePhoto,
	);

	router.post('/upload', app.middleware.jwt(), controller.upload.uploadFile);

	router.get('/soup', controller.soup.index);
};
