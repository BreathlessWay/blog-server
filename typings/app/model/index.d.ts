// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportImage from '../../../app/model/image';
import ExportLogin from '../../../app/model/login';
import ExportMenu from '../../../app/model/menu';
import ExportTag from '../../../app/model/tag';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
	interface IModel {
		Article: ReturnType<typeof ExportArticle>;
		Image: ReturnType<typeof ExportImage>;
		Login: ReturnType<typeof ExportLogin>;
		Menu: ReturnType<typeof ExportMenu>;
		Tag: ReturnType<typeof ExportTag>;
		User: ReturnType<typeof ExportUser>;
	}
}
