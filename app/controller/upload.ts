import BaseController from './BaseController';

export default class UploadController extends BaseController {
	public async uploadFile() {
		const { success, service, fail } = this;

		try {
			const data = await service.upload.uploadFile();

			success({
				msg: '上传文件成功！',
				data,
			});
		} catch (e) {
			fail({
				msg: '上传文件失败！',
				error: e,
			});
		}
	}
}
