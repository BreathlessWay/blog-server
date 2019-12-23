import 'egg';

import { Application } from 'egg';

const UserModel = (app: Application) => {
	const { Schema, model } = app.mongoose;

	const UserSchema = new Schema({
		email: { type: String },
	});

	return model('User', UserSchema);
};

export default UserModel;
