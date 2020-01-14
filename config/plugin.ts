import { EggPlugin } from 'egg';

export const plugin: EggPlugin = {
	static: true,
	logrotator: {
		enable: true,
		package: 'egg-logrotator',
	},
	mongoose: {
		enable: true,
		package: 'egg-mongoose',
	},
};

export default plugin;
