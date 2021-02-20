import { Service } from 'egg';
import * as cheerio from 'cheerio';

export default class SoupService extends Service {
	private async saveSoup({ data, id, list }) {
		const { ctx } = this;
		if (!list.includes(data)) {
			list.push(data);
			await ctx.model.Soup.findByIdAndUpdate(id, { $set: { list } });
		}
	}

	private async getSoupFromDB() {
		const { ctx } = this;
		let soupData;
		soupData = await ctx.model.Soup.findOne();
		if (!soupData) {
			soupData = await this.createSoup();
		}
		return soupData;
	}

	private async createSoup() {
		const { ctx } = this;
		return ctx.model.Soup.insertMany({ list: [] });
	}

	private async getRandomSoupFromDB(soupData) {
		if (soupData && soupData.count) {
			const { list, count } = soupData,
				randomIndex = Math.floor(Math.random() * count);

			return list[randomIndex];
		}
	}

	public async getSoup() {
		let res: any = '';
		const { ctx } = this;
		const soupData = await this.getSoupFromDB();
		try {
			res = await ctx.curl('http://www.nows.fun/', { dataType: 'text' });

			if (res && res.data) {
				const $ = cheerio.load(res.data);
				res = $('#sentence').text();
				await this.saveSoup({
					data: res,
					id: soupData._id,
					list: soupData.list,
				});
			}
		} catch (e) {
			res = await this.getRandomSoupFromDB(soupData);
		}

		return res;
	}
}
