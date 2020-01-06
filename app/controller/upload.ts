import BaseController from './BaseController';

export default class UploadController extends BaseController {
	public async uploadFile() {
		const { service, ctx } = this;

		try {
			const stream = await ctx.getFileStream();

			if (!stream) {
				this.clientError();
				return;
			}

			const data = await service.upload.uploadFile(stream);

			if (data) {
				this.success({
					msg: '上传文件成功！',
					data,
				});
			} else {
				this.clientError({
					msg: '上传文件失败！',
				});
			}
		} catch (e) {
			this.fail({
				msg: '上传文件失败！',
				error: e,
			});
		}
	}
}
