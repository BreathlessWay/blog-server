import BaseController from './BaseController';

export default class UploadController extends BaseController {
	public async uploadFile() {
		try {
			const { service } = this;

			const data = await service.upload.uploadFile();

			this.success({
				msg: '上传文件成功！',
				data,
			});
		} catch (e) {
			this.fail({
				msg: '上传文件失败！',
				error: e,
			});
		}
	}
}