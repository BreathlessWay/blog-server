import { Service } from 'egg';

export default class PhotographyService extends Service {
	public async getAlbumList({ pageIndex, pageSize }) {
		const { ctx } = this;
		const count = await ctx.model.AlbumList.countDocuments(),
			list = await ctx.model.AlbumList.find()
				.select('-photo')
				.skip((pageIndex - 1) * pageSize)
				.limit(pageSize);

		return {
			count,
			list,
		};
	}

	public async createAlbum({ title, show }) {
		const { ctx } = this;

		const album = new ctx.model.AlbumList({
			title,
			show,
		});
		return album.save();
	}
}
