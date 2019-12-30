import { Model } from 'mongoose';

import { IMenuModel } from './menu';
import { ILoginModel } from './login';
import { IUserModel } from './user';
import { ITagModel } from './tag';

declare module 'egg' {
	interface Context {
		model: {
			Menu: Model<IMenuModel>;
			Login: Model<ILoginModel>;
			User: Model<IUserModel>;
			Tag: Model<ITagModel>;
		};
	}
}
