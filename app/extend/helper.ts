import * as moment from 'moment';

moment.locale('zh');

export default {
	random(min, max): number {
		return Math.floor(Math.random() * (max - min)) + min;
	},
	isEmail: (email: string) =>
		/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email),
};
