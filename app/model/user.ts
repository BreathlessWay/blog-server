import 'egg';

import * as moment from 'moment';

import { Model, Document } from 'mongoose';

import { Application } from 'egg';

export interface IUserModel extends Document {
	email: string;
	create_at: number;
	code: string;
	code_expires: number;
}

const UserModel = (app: Application): Model<IUserModel> => {
	const { Schema, model } = app.mongoose;

	const UserSchema = new Schema({
		email: { type: String },
		create_at: {
			type: Date,
			default: Date.now(),
			get: v => moment(v).valueOf(),
		},
		code: { type: String },
		code_expires: {
			type: Date,
			get: v => moment(v).valueOf(),
		},
	});

	return model<IUserModel>('User', UserSchema);
};

declare module 'egg' {
	interface Context {
		model: {
			User: Model<IUserModel>;
		};
	}
}

export default UserModel;
