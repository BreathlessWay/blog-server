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
		name: '首1页',
		type: EMenuType.home,
		show: true,
		onlyAdmin: false,
	},
	{
		name: '我',
		type: EMenuType.me,
		show: true,
		onlyAdmin: false,
	},
	{
		name: '文章',
		type: EMenuType.article,
		show: true,
		onlyAdmin: false,
	},
	{
		name: '撸猫',
		type: EMenuType.cat,
		show: true,
		onlyAdmin: false,
	},
	{
		name: '摄影',
		type: EMenuType.photography,
		show: true,
		onlyAdmin: false,
	},
	{
		name: '网站统计',
		type: EMenuType.statistics,
		show: false,
		onlyAdmin: true,
	},
];
