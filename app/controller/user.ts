import BaseController from './BaseController';

export default class UserController extends BaseController {
	public async getUserDetail() {
		const { service } = this;

		try {
			const userDetail = await service.user.getUserDetail();
			this.success({
				msg: '获取用户信息成功！',
				data: userDetail,
			});
		} catch (e) {
			this.fail({
				msg: '获取用户信息失败！',
				error: e,
			});
		}
	}

	public async updateUserDetail() {
		const { ctx, service } = this;

		try {
			const data = ctx.request.body;

			if (!data || !Object.keys(data).length) {
				this.clientError();
				return;
			}

			const userDetail = await service.user.updateUserDetail();
			this.success({
				msg: '更新用户信息成功！',
				data: userDetail,
			});
		} catch (e) {
			this.fail({
				msg: '更新用户信息失败！',
				error: e,
			});
		}
	}
}
