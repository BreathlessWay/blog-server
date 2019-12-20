// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLogin from '../../../app/controller/login';
import ExportNews from '../../../app/controller/news';
import ExportSoup from '../../../app/controller/soup';

declare module 'egg' {
	interface IController {
		login: ExportLogin;
		news: ExportNews;
		soup: ExportSoup;
	}
}
