// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportAlbum from '../../../app/controller/album';
import ExportArticle from '../../../app/controller/article';
import ExportCat from '../../../app/controller/cat';
import ExportLogin from '../../../app/controller/login';
import ExportMenu from '../../../app/controller/menu';
import ExportNews from '../../../app/controller/news';
import ExportPhoto from '../../../app/controller/photo';
import ExportSoup from '../../../app/controller/soup';
import ExportTag from '../../../app/controller/tag';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
	interface IController {
		baseController: ExportBaseController;
		album: ExportAlbum;
		article: ExportArticle;
		cat: ExportCat;
		login: ExportLogin;
		menu: ExportMenu;
		news: ExportNews;
		photo: ExportPhoto;
		soup: ExportSoup;
		tag: ExportTag;
		upload: ExportUpload;
		user: ExportUser;
	}
}
