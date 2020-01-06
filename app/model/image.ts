import { Document, Schema } from 'mongoose';

export interface IImageItemModel extends Document {
	title: string;
	intro?: string;
	url: string;
	show: boolean;
}

export const baseImageSchema = {
	title: {
		type: String,
		default: '',
	},
	intro: {
		type: String,
		default: '',
	},
	url: {
		type: String,
		required: true,
		trim: true,
	},
	show: {
		type: Boolean,
		default: true,
	},
};

const ImageItemSchema = timestamps => {
	return new Schema(baseImageSchema, {
		timestamps,
	});
};

export default ImageItemSchema;
