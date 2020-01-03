import { Document, Schema } from 'mongoose';

export interface IImageItemModel extends Document {
	title: string;
	intro?: string;
	url: string;
	show: boolean;
}

const ImageItemSchema = new Schema({
	title: String,
	intro: String,
	url: {
		type: String,
		required: true,
		trim: true,
	},
	show: {
		type: Boolean,
		default: true,
	},
});

export default ImageItemSchema;
