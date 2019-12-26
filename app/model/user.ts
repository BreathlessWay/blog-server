import * as moment from 'moment';

import { Model, Document } from 'mongoose';

import { Application } from 'egg';

export interface IUserModel extends Document {
	email: string;
	create_at: number;
	code: string;
	code_expires: number;
	menu: string;
}

const UserModel = (app: Application): Model<IUserModel> => {
	const { Schema, model } = app.mongoose;

	const UserSchema = new Schema(
		{
			email: { type: String },
			code: { type: String },
			code_expires: {
				type: Date,
				get: v => moment(v).valueOf(),
			},
		},
		{
			timestamps: true,
		},
	);

	return model<IUserModel>('User', UserSchema);
};

export default UserModel;
