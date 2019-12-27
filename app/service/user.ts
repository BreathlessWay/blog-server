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

	public async updateUserDetail() {
		const { ctx } = this;
		const data = ctx.request.body;
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
