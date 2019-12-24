import * as moment from 'moment';
import { CODE_LENGTH, DATA_LIST } from '../constants';

moment.locale('zh');

const helper = {
	random(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},
	randomCode() {
		const len = DATA_LIST.length;
		let code = '';
		for (let i = 0; i < CODE_LENGTH; i++) {
			code += DATA_LIST[helper.random(0, len)];
		}
		return code;
	},
	isEmail(email: string) {
		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
			email,
		);
	},
};

export default helper;
