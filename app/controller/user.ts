import BaseController from './BaseController';

export default class UserController extends BaseController {
	public async getUserDetail() {
		const { service, success, fail } = this;

		try {
			const userDetail = await service.user.getUserDetail();
			success({
				msg: '获取用户信息成功！',
				data: userDetail,
			});
		} catch (e) {
			fail({
				msg: '获取用户信息失败！',
				error: e,
			});
		}
	}

	public async updateUserDetail() {
		const { ctx, service, success, fail, paramsError } = this;

		try {
			const data = ctx.request.body;

			if (!data || !Object.keys(data).length) {
				paramsError();
				return;
			}

			const userDetail = await service.user.updateUserDetail();
			success({
				msg: '更新用户信息成功！',
				data: userDetail,
			});
		} catch (e) {
			fail({
				msg: '更新用户信息失败！',
				error: e,
			});
		}
	}
}
