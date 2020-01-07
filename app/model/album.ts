import { Model, Document, Schema } from 'mongoose';
import { Application } from 'egg';

export interface IAlbumModel extends Document {
	title: string;
	show: boolean;
	count: number;
	cover: string;
	photo: Array<string>;
}

const AlbumModel = (app: Application): Model<IAlbumModel> => {
	const { model } = app.mongoose;

	const AlbumSchema = new Schema(
		{
			title: {
				type: String,
				default: '',
				unique: true,
				required: true,
			},
			show: {
				type: Boolean,
				default: true,
			},
			photo: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
			cover: { type: Schema.Types.ObjectId, ref: 'Photo' },
		},
		{
			timestamps: true,
		},
	);

	AlbumSchema.virtual('count').get(function(this: IAlbumModel) {
		return this.photo.length;
	});

	return model<IAlbumModel>('Album', AlbumSchema);
};

export default AlbumModel;
