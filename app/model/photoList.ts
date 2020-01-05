import { Model } from 'mongoose';
import { Application } from 'egg';
import ImageItemSchema, { IImageItemModel } from './image';

export interface IPhotoListItemModel extends IImageItemModel {}

const PhotoListModel = (app: Application): Model<IPhotoListItemModel> => {
	const { model } = app.mongoose;

	return model<IPhotoListItemModel>('PhotoList', ImageItemSchema(true));
};

export default PhotoListModel;
