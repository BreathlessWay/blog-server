import { Document, Model } from 'mongoose';
import { Application } from 'egg';

export enum EArticleRenderType {
	richText = 'richText',
	markdown = 'markdown',
}

export enum EArticleStatus {
	all = -1,
	hide = 0,
	show = 1,
}

export interface IArticleModel extends Document {
	title: string;
	intro: string;
	richTextHtml: string;
	richTextRaw: string;
	markdown: string;
	status: EArticleStatus;
	renderType: EArticleRenderType;
	tags: Array<string>;
}

const ArticleModel = (app: Application): Model<IArticleModel> => {
	const { Schema, model } = app.mongoose;

	const ArticleSchema = new Schema(
		{
			title: {
				type: String,
				unique: true,
			},
			intro: String,
			richTextHtml: String,
			richTextRaw: String,
			markdown: String,
			status: {
				type: Number,
				enum: [0, 1],
			},
			renderType: {
				type: String,
				enum: ['richText', 'markdown'],
			},
			tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
		},
		{
			timestamps: true,
		},
	);

	return model<IArticleModel>('Article', ArticleSchema);
};

export default ArticleModel;
