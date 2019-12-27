// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportLogin from '../../../app/controller/login';
import ExportMenu from '../../../app/controller/menu';
import ExportNews from '../../../app/controller/news';
import ExportSoup from '../../../app/controller/soup';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
	interface IController {
		baseController: ExportBaseController;
		login: ExportLogin;
		menu: ExportMenu;
		news: ExportNews;
		soup: ExportSoup;
		upload: ExportUpload;
		user: ExportUser;
	}
}
