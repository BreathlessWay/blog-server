import BaseController from './BaseController';

export default class UserController extends BaseController {
	public async getUserDetail() {
		try {
			const { service } = this;
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
		try {
			const { service, ctx } = this;
			const data = ctx.request.body;
			if (!data) {
				this.paramsError();
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
