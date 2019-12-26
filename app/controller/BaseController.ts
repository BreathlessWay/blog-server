import { Controller } from 'egg';
import * as JWT from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export default class BaseController extends Controller {
	get userId() {
		const { ctx } = this;
		const token = ctx.request.header.authorization;

		if (token) {
			const decode = JWT.verify(token.split(' ')[1], JWT_SECRET) as {
				userId: string;
				exp: number;
			};
			if (decode) {
				return decode.userId;
			}
		}
		return '';
	}

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
		msg = '服务器错误！',
		error,
	}: {
		code?: number;
		msg?: string;
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
