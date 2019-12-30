import { Document, Model } from 'mongoose';
import { Application } from 'egg';

export interface ITagModel extends Document {
	name: string;
	count: number;
	show: boolean;
}

const TagModel = (app: Application): Model<ITagModel> => {
	const { Schema, model } = app.mongoose;

	const TagSchema = new Schema(
		{
			name: String,
			count: Number,
			show: Boolean,
		},
		{
			timestamps: true,
		},
	);

	return model<ITagModel>('Tag', TagSchema);
};

export default TagModel;
