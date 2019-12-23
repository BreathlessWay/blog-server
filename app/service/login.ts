import { Service } from 'egg';

export default class LoginService extends Service {
	public async isRegister() {
		const { ctx } = this;
		const user = await ctx.model.User.find({ email: ctx.query.email });
		return user && user.length > 0;
	}
}
