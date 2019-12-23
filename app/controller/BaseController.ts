import { Controller } from 'egg';

export default class BaseController extends Controller {
	public success({ code = 200, msg }: { code?: number; msg: string }) {
		const { ctx } = this;
		ctx.status = code;
		ctx.body = {
			success: true,
			msg,
		};
	}

	public fail({ code = 200, msg }: { code?: number; msg: string }) {
		const { ctx } = this;
		ctx.handleError({
			code,
			msg,
		});
	}
}
