import { Service } from 'egg';

export default class PhotoService extends Service {
	public async getPhotoList({ pageIndex, pageSize, albumId }) {
		const { ctx } = this;

		const count = await ctx.model.Photo.find({ albumId }).countDocuments(),
			list = await ctx.model.Photo.find({ albumId })
				.skip((pageIndex - 1) * pageSize)
				.limit(pageSize);

		return {
			count,
			list,
		};
	}

	public async createPhoto({ list, albumId }) {
		const { ctx } = this;

		const insertList = list.map(item => {
			item.albumId = albumId;
			return item;
		});

		return ctx.model.Photo.insertMany(insertList);
	}

	public async updatePhotoInfo({ detail, albumId, id }) {
		const { ctx } = this;

		return ctx.model.Photo.findByIdAndUpdate(
			{ albumId, _id: id },
			{ $set: detail },
		);
	}
}
