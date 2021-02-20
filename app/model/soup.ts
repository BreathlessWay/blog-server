import { Model, Document, Schema } from 'mongoose';
import { Application } from 'egg';

export interface ISoupModel extends Document {
	count: number;
	list: Array<string>;
}

const SoupModel = (app: Application): Model<ISoupModel> => {
	const { model } = app.mongoose;

	const SoupSchema = new Schema(
		{
			list: [{ type: String }],
		},
		{
			timestamps: false,
		},
	);

	SoupSchema.virtual('count').get(function(this: ISoupModel) {
		return this.list.length;
	});

	return model<ISoupModel>('Soup', SoupSchema);
};

export default SoupModel;
