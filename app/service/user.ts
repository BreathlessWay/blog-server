import { Service } from 'egg';

export default class UserService extends Service {
	public async getUserDetail() {
		const { ctx } = this;
		let userDetail = await ctx.model.User.findOne();
		if (!userDetail) {
			userDetail = new ctx.model.User();
			await userDetail.save();
		}
		return userDetail;
	}

	public async updateUserDetail(data) {
		const { ctx } = this;
		return ctx.model.User.findOneAndUpdate(
			{},
			{
				$set: data,
			},
			{
				new: true,
			},
		);
	}
}
