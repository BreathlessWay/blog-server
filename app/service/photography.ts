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

	public async updateAlbum({ id, data }) {
		const { ctx } = this;

		return ctx.model.AlbumList.findByIdAndUpdate(id, { $set: data });
	}

	public async deleteAlbum({ id }) {
		const { ctx } = this;

		await ctx.model.AlbumList.findByIdAndRemove(id);
		await ctx.model.PhotoList.deleteMany({ albumId: id });
	}

	public async batchUpdateAlbum({ ids, data }) {
		const { ctx } = this;

		return ctx.model.AlbumList.updateMany(
			{ _id: { $in: ids } },
			{ $set: data },
		);
	}

	public async batchDeleteAlbum({ ids }) {
		const { ctx } = this;

		await ctx.model.AlbumList.deleteMany({ _id: { $in: ids } });
		await ctx.model.PhotoList.deleteMany({ albumId: { $in: ids } });
	}
}
