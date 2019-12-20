import { Service } from 'egg';
import * as cheerio from 'cheerio';

export default class SoupService extends Service {
	public async getSoup() {
		const { ctx } = this;
		const res = await ctx.curl('http://www.nows.fun/', { dataType: 'text' });
		if (res && res.data) {
			const $ = cheerio.load(res.data);
			return $('#sentence').text();
		}
		ctx.logger.error('毒鸡汤网站抓取失败！');
	}
}
