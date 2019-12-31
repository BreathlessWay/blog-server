import * as moment from 'moment';

import { Model, Document } from 'mongoose';

import { Application } from 'egg';

export interface ILoginModel extends Document {
	email: string;
	code: string;
	code_expires: number;
	menu: string;
}

const LoginModel = (app: Application): Model<ILoginModel> => {
	const { Schema, model } = app.mongoose;

	const LoginSchema = new Schema(
		{
			email: { type: String, required: true },
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

	return model<ILoginModel>('Login', LoginSchema);
};

export default LoginModel;
