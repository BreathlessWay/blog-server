import BaseController from './BaseController';

export default class SoupController extends BaseController {
	public async index() {
		const { service } = this;

		try {
			const res = await service.soup.getSoup();
			this.success({
				msg: '获取毒鸡汤成功！',
				data: {
					result: res || 'ops！，今天的毒鸡汤喝完了！！！',
				},
			});
		} catch (e) {
			this.fail({
				msg: '获取毒鸡汤失败！',
				error: e,
			});
		}
	}
}
