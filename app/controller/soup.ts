import BaseController from './BaseController';

export default class SoupController extends BaseController {
	public async index() {
		const { service } = this;

		try {
			const res = await service.soup.getSoup();
			if (res) {
				this.success({
					msg: '获取毒鸡汤成功！',
					data: {
						result: res,
					},
				});
			} else {
				throw new Error();
			}
		} catch (e) {
			this.fail({
				msg: '获取毒鸡汤失败！',
				error: e,
			});
		}
	}
}
