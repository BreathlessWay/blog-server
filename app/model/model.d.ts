import { Model } from 'mongoose';

import { IMenuModel } from './menu';
import { ILoginModel } from './login';
import { IUserModel } from './user';
import { ITagModel } from './tag';
import { IArticleModel } from './article';
import { ICatFigureItemModel } from './catFigure';
import { ICatListItemModel } from './catList';
import { IAlbumModel } from './album';
import { IPhotoModel } from './photo';

declare module 'egg' {
	interface Context {
		model: {
			Menu: Model<IMenuModel>;
			Login: Model<ILoginModel>;
			User: Model<IUserModel>;
			Tag: Model<ITagModel>;
			Article: Model<IArticleModel>;
			CatFigure: Model<ICatFigureItemModel>;
			CatList: Model<ICatListItemModel>;
			Album: Model<IAlbumModel>;
			Photo: Model<IPhotoModel>;
		};
	}
}
