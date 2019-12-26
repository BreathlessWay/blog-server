import { Application } from 'egg';

import { Document, Model } from 'mongoose';

export interface IHomeModel extends Document {}

const HomeModel = (app: Application): Model<IHomeModel> => {
	const { Schema, model } = app.mongoose;

	const SocialItemSchema = new Schema({
		icon: String,
		value: String,
	});

	const HomeSchema = new Schema(
		{
			figure: [String],
			en: String,
			cn: String,
			intro: String,
			resumeAlias: String,
			resumeUrl: String,
			resumeName: String,
			resumeImageUrl: String, // 简历文件转图片
			social: [SocialItemSchema],
			rewardEnable: Boolean,
			rewardTitle: String,
			zfbCode: String,
			wxCode: String,
		},
		{
			timestamps: true,
		},
	);

	return model<IHomeModel>('Home', HomeSchema);
};

export default HomeModel;
