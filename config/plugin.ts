import { EggPlugin } from 'egg';

export const plugin: EggPlugin = {
	static: true,
	validate: {
		enable: true,
		package: 'egg-validate',
	},
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
