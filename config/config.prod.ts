import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
	const config: PowerPartial<EggAppConfig> = {};
	const bizConfig = {
		mongoose: {
			client: {
				url: 'mongodb://127.0.0.1:4444/blog-server',
				options: {
					useFindAndModify: false,
					useUnifiedTopology: true,
					useCreateIndex: true,
					user: 'blog',
					pass: 'blog',
				},
			},
		},
	};
	return {
		...config,
		...bizConfig,
	};
};
