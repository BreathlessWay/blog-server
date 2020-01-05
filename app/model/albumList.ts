import { Model, Document, Schema } from 'mongoose';
import { Application } from 'egg';

export interface IAlbumItemModel extends Document {
	title: string;
	show: boolean;
	count: number;
	cover: string;
	photo: Array<string>;
}

const AlbumListModel = (app: Application): Model<IAlbumItemModel> => {
	const { model } = app.mongoose;

	const AlbumItemSchema = new Schema(
		{
			title: {
				type: String,
				default: '',
				unique: true,
			},
			show: {
				type: Boolean,
				default: true,
			},
			photo: [{ type: Schema.Types.ObjectId, ref: 'PhotoList' }],
			cover: {
				type: String,
				default: '',
			},
		},
		{
			timestamps: true,
		},
	);

	AlbumItemSchema.virtual('count').get(function(this: IAlbumItemModel) {
		return this.photo.length;
	});

	return model<IAlbumItemModel>('AlbumList', AlbumItemSchema);
};

export default AlbumListModel;
