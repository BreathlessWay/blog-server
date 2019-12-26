// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMenu from '../../../app/model/menu';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
	interface IModel {
		Menu: ReturnType<typeof ExportMenu>;
		User: ReturnType<typeof ExportUser>;
	}
}
