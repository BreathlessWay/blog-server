import { Document, Model } from 'mongoose';
import { Application } from 'egg';

import { EMenuType } from '../constants/menu';

export interface IMenuModel extends Document {
	name: string;
	type: EMenuType;
	show: boolean;
	onlyAdmin: boolean;
	sort: number;
}

const MenuModel = (app: Application): Model<IMenuModel> => {
	const { Schema, model } = app.mongoose;

	const MenuSchema = new Schema(
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
			sort: Number,
		},
		{
			timestamps: true,
		},
	);

	return model<IMenuModel>('Menu', MenuSchema);
};

export default MenuModel;
