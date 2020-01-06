import { Model, Schema } from 'mongoose';
import { Application } from 'egg';
import { baseImageSchema, IImageItemModel } from './image';

export interface IPhotoModel extends IImageItemModel {
	albumId: string;
}

const PhotoModel = (app: Application): Model<IPhotoModel> => {
	const { model } = app.mongoose;

	const photoSchema = {
		...baseImageSchema,
		albumId: {
			type: Schema.Types.ObjectId,
			ref: 'Album',
		},
	};

	const PhotoSchema = new Schema(photoSchema, {
		timestamps: true,
	});

	return model<IPhotoModel>('Photo', PhotoSchema);
};

export default PhotoModel;
