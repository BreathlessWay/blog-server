import { Service } from 'egg';

export default class PhotoService extends Service {
	public async getPhotoList({ pageIndex, pageSize, albumId }) {
		const { ctx } = this;

		return ctx.model.Photo.find({ albumId })
			.skip((pageIndex - 1) * pageSize)
			.limit(pageSize);
	}
}
