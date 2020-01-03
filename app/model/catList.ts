import { Model } from 'mongoose';
import { Application } from 'egg';
import ImageItemSchema, { IImageItemModel } from './image';

export interface ICatListItemModel extends IImageItemModel {}

const CatListModel = (app: Application): Model<ICatListItemModel> => {
	const { model } = app.mongoose;

	return model<ICatListItemModel>('CatList', ImageItemSchema(true));
};

export default CatListModel;
