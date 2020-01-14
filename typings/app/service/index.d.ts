// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAlbum from '../../../app/service/album';
import ExportArticle from '../../../app/service/article';
import ExportCat from '../../../app/service/cat';
import ExportLogin from '../../../app/service/login';
import ExportMenu from '../../../app/service/menu';
import ExportPhoto from '../../../app/service/photo';
import ExportSoup from '../../../app/service/soup';
import ExportTag from '../../../app/service/tag';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
	interface IService {
		album: ExportAlbum;
		article: ExportArticle;
		cat: ExportCat;
		login: ExportLogin;
		menu: ExportMenu;
		photo: ExportPhoto;
		soup: ExportSoup;
		tag: ExportTag;
		upload: ExportUpload;
		user: ExportUser;
	}
}
