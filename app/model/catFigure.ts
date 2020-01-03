import { Model } from 'mongoose';
import { Application } from 'egg';
import ImageItemSchema, { IImageItemModel } from './image';

export interface ICatFigureItemModel extends IImageItemModel {}

const CatFigureModel = (app: Application): Model<ICatFigureItemModel> => {
	const { model } = app.mongoose;

	return model<ICatFigureItemModel>('CatFigure', ImageItemSchema(true));
};

export default CatFigureModel;
