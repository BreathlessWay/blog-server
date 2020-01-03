import { Document, Schema } from 'mongoose';

export interface IImageItemModel extends Document {
	title: string;
	intro?: string;
	url: string;
	show: boolean;
}

const ImageItemSchema = timestamps => {
	return new Schema(
		{
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
		},
		{
			timestamps,
		},
	);
};

export default ImageItemSchema;
