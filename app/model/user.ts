import { Application } from 'egg';

import ImageItemSchema, { IImageItemModel } from './image';

import { Document, Model } from 'mongoose';

export interface ISocialItemModel extends Document {
	icon: string;
	value: string;
}

export interface IPersonSkill extends Document {
	name: string;
	percent: number;
	color: string;
}

export interface IUserModel extends Document {
	personalFigure: Array<IImageItemModel>;
	en: string;
	zh: string;
	intro: string;
	resumeAlias: string;
	resumeUrl: string;
	resumeName: string;
	resumeImageUrl: string; // 简历文件转图片
	social: Array<ISocialItemModel>;
	rewardEnable: string;
	rewardTitle: string;
	zfbCode: string;
	wxCode: string;

	hobbiesFigure: Array<IImageItemModel>;
	personalTitle: string;
	personalInfo: string;
	personalIntro: string;
	personalSkill: Array<IPersonSkill>;
}

const UserModel = (app: Application): Model<IUserModel> => {
	const { Schema, model } = app.mongoose;

	const SocialItemSchema = new Schema({
		icon: String,
		value: String,
	});

	const PersonSkillItemSchema = new Schema({
		name: String,
		percent: Number,
		color: String,
	});
	// 数组如果设置默认值null，会返回空数组，设置默认值undefined，就不会创建字段
	const UserSchema = new Schema(
		{
			personalFigure: {
				type: [ImageItemSchema],
			},
			en: {
				type: String,
				default: '',
			},
			zh: {
				type: String,
				default: '',
			},
			intro: {
				type: String,
				default: '',
			},
			resumeAlias: {
				type: String,
				default: '',
			},
			resumeUrl: {
				type: String,
				default: '',
			},
			resumeName: {
				type: String,
				default: '',
			},
			resumeImageUrl: {
				type: String,
				default: '',
			}, // 简历文件转图片
			social: {
				type: [SocialItemSchema],
			},
			rewardEnable: {
				type: Boolean,
				default: false,
			},
			rewardTitle: {
				type: String,
				default: '',
			},
			zfbCode: {
				type: String,
				default: '',
			},
			wxCode: {
				type: String,
				default: '',
			},

			hobbiesFigure: {
				type: [ImageItemSchema],
			},
			personalTitle: {
				type: String,
				default: '',
			},
			personalInfo: {
				type: String,
				default: '',
			},
			personalIntro: {
				type: String,
				default: '',
			},
			personalSkill: {
				type: [PersonSkillItemSchema],
			},
		},
		{
			timestamps: true,
		},
	);

	return model<IUserModel>('User', UserSchema);
};

export default UserModel;
