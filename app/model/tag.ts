import { Document, Model } from 'mongoose';
import { Application } from 'egg';

export interface ITagModel extends Document {
	name: string;
	count: number;
	show: boolean;
	article: Array<string>;
}

const TagModel = (app: Application): Model<ITagModel> => {
	const { Schema, model } = app.mongoose;

	const TagSchema = new Schema(
		{
			name: {
				type: String,
				unique: true,
			},
			count: Number,
			show: Boolean,
			article: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
		},
		{
			timestamps: true,
		},
	);

	return model<ITagModel>('Tag', TagSchema);
};

export default TagModel;
