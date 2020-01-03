import BaseController from './BaseController';

export default class CatController extends BaseController {
	public async getCatFigure() {
		const { success, fail } = this;

		try {
			success({
				msg: '获取猫卡通图成功！',
				data: {
					list: [],
				},
			});
		} catch (e) {
			fail({
				msg: '获取猫卡通图失败！',
				error: e,
			});
		}
	}
}
