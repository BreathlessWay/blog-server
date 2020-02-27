import { Document, Model } from 'mongoose';
import { Application } from 'egg';

export interface ITagModel extends Document {
	name: string;
	count: number;
	showCount: number;
	show: boolean;
	createdAt: string;
	updatedAt: string;
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
			show: Boolean,
			article: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
		},
		{
			timestamps: true,
		},
	);

	TagSchema.virtual('count').get(function(this: ITagModel) {
		return this.article.length;
	});

	return model<ITagModel>('Tag', TagSchema);
};

export default TagModel;
