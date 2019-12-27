// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportImage from '../../../app/model/image';
import ExportLogin from '../../../app/model/login';
import ExportMenu from '../../../app/model/menu';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
	interface IModel {
		Image: ReturnType<typeof ExportImage>;
		Login: ReturnType<typeof ExportLogin>;
		Menu: ReturnType<typeof ExportMenu>;
		User: ReturnType<typeof ExportUser>;
	}
}
