import { Service } from 'egg';

export default class AlbumService extends Service {
	public async getAlbumList({ pageIndex, pageSize }) {
		const { ctx } = this;
		const count = await ctx.model.Album.countDocuments(),
			list = await ctx.model.Album.find()
				.select('-photo')
				.skip((pageIndex - 1) * pageSize)
				.limit(pageSize);

		return {
			count,
			list,
		};
	}

	public async getAlbumInfo(id) {
		const { ctx } = this;

		return ctx.model.Album.findById(id).select(
			'-photo -show -createdAt -updatedAt',
		);
	}

	public async createAlbum({ title, show }) {
		const { ctx } = this;

		const album = new ctx.model.Album({
			title,
			show,
		});
		return album.save();
	}

	public async updateAlbum({ id, data }) {
		const { ctx } = this;

		return ctx.model.Album.findByIdAndUpdate(id, { $set: data });
	}

	public async deleteAlbum({ id }) {
		const { ctx } = this;

		await ctx.model.Album.findByIdAndRemove(id);
		await ctx.model.PhotoList.deleteMany({ albumId: id });
	}

	public async batchUpdateAlbum({ ids, data }) {
		const { ctx } = this;

		return ctx.model.Album.updateMany({ _id: { $in: ids } }, { $set: data });
	}

	public async batchDeleteAlbum({ ids }) {
		const { ctx } = this;

		await ctx.model.Album.deleteMany({ _id: { $in: ids } });
		await ctx.model.PhotoList.deleteMany({ albumId: { $in: ids } });
	}
}
