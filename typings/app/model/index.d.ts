// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAlbum from '../../../app/model/album';
import ExportArticle from '../../../app/model/article';
import ExportCatFigure from '../../../app/model/catFigure';
import ExportCatList from '../../../app/model/catList';
import ExportImage from '../../../app/model/image';
import ExportLogin from '../../../app/model/login';
import ExportMenu from '../../../app/model/menu';
import ExportPhoto from '../../../app/model/photo';
import ExportSoup from '../../../app/model/soup';
import ExportTag from '../../../app/model/tag';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
	interface IModel {
		Album: ReturnType<typeof ExportAlbum>;
		Article: ReturnType<typeof ExportArticle>;
		CatFigure: ReturnType<typeof ExportCatFigure>;
		CatList: ReturnType<typeof ExportCatList>;
		Image: ReturnType<typeof ExportImage>;
		Login: ReturnType<typeof ExportLogin>;
		Menu: ReturnType<typeof ExportMenu>;
		Photo: ReturnType<typeof ExportPhoto>;
		Soup: ReturnType<typeof ExportSoup>;
		Tag: ReturnType<typeof ExportTag>;
		User: ReturnType<typeof ExportUser>;
	}
}
