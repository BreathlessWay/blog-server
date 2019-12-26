import { Model } from 'mongoose';
import { IMenuModel } from './menu';
import { IUserModel } from './user';

declare module 'egg' {
	interface Context {
		model: {
			Menu: Model<IMenuModel>;
			User: Model<IUserModel>;
		};
	}
}
