// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLogin from '../../../app/service/login';
import ExportNews from '../../../app/service/news';
import ExportSoup from '../../../app/service/soup';

declare module 'egg' {
	interface IService {
		login: ExportLogin;
		news: ExportNews;
		soup: ExportSoup;
	}
}
