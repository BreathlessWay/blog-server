import { Model, Schema } from 'mongoose';
import { Application } from 'egg';
import { baseImageSchema, IImageItemModel } from './image';

export interface IPhotoListItemModel extends IImageItemModel {
	albumId: string;
}

const PhotoListModel = (app: Application): Model<IPhotoListItemModel> => {
	const { model } = app.mongoose;

	const photoSchema = {
		...baseImageSchema,
		albumId: {
			type: Schema.Types.ObjectId,
			ref: 'AlbumList',
		},
	};

	const PhotoListSchema = new Schema(photoSchema, {
		timestamps: true,
	});

	return model<IPhotoListItemModel>('PhotoList', PhotoListSchema);
};

export default PhotoListModel;
