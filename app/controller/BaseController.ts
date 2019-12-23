import { Controller } from 'egg';

export default class BaseController extends Controller {
	public success({
		code = 200,
		msg,
		data,
	}: {
		code?: number;
		msg: string;
		data?: any;
	}) {
		const { ctx } = this;
		ctx.status = code;
		ctx.body = {
			success: true,
			msg,
			data,
		};
	}

	public fail({
		code = 500,
		msg,
		error,
	}: {
		code?: number;
		msg: string;
		error?: Error;
	}) {
		const { ctx } = this;
		ctx.handleError({
			code,
			msg,
			error,
		});
	}
}
