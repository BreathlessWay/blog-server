// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportNews from '../../../app/service/news';
import ExportSoup from '../../../app/service/soup';

declare module 'egg' {
	interface IService {
		news: ExportNews;
		soup: ExportSoup;
	}
}
