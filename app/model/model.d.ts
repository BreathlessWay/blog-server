import { Model } from 'mongoose';
import { IMenuModel } from './menu';
import { IUserModel } from './user';
import { IHomeModel } from './home';

declare module 'egg' {
	interface Context {
		model: {
			Menu: Model<IMenuModel>;
			User: Model<IUserModel>;
			Home: Model<IHomeModel>;
		};
	}
}
