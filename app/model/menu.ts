import { Document, Model } from 'mongoose';
import { Application } from 'egg';

import { EMenuType } from '../constants/menu';

export interface IMenuModel extends Document {
	userId: string;
	list: Array<{
		name: string;
		type: EMenuType;
		show: boolean;
		onlyAdmin: boolean;
	}>;
}

const MenuModel = (app: Application): Model<IMenuModel> => {
	const { Schema, model } = app.mongoose;

	const MenuItemSchema = new Schema(
		{
			name: String,
			type: {
				type: String,
				enum: [
					EMenuType.home,
					EMenuType.me,
					EMenuType.article,
					EMenuType.cat,
					EMenuType.photography,
					EMenuType.statistics,
				],
			},
			show: Boolean,
			onlyAdmin: Boolean,
		},
		{
			_id: false,
		},
	);

	const MenuSchema = new Schema(
		{
			list: [MenuItemSchema],
		},
		{
			timestamps: true,
		},
	);

	return model<IMenuModel>('Menu', MenuSchema);
};

export default MenuModel;
