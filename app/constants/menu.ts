export enum EMenuType {
	home = 'home',
	me = 'user',
	article = 'read',
	cat = 'contacts',
	photography = 'camera',
	statistics = 'fund',
}

export const baseRoute = [
	{
		name: '首页',
		type: EMenuType.home,
		show: true,
		onlyAdmin: false,
		sort: 0,
	},
	{
		name: '我',
		type: EMenuType.me,
		show: true,
		onlyAdmin: false,
		sort: 1,
	},
	{
		name: '文章',
		type: EMenuType.article,
		show: true,
		onlyAdmin: false,
		sort: 2,
	},
	{
		name: '撸猫',
		type: EMenuType.cat,
		show: true,
		onlyAdmin: false,
		sort: 3,
	},
	{
		name: '摄影',
		type: EMenuType.photography,
		show: true,
		onlyAdmin: false,
		sort: 4,
	},
	{
		name: '网站统计',
		type: EMenuType.statistics,
		show: false,
		onlyAdmin: true,
		sort: 5,
	},
];
