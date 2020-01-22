import { EggAppConfig, PowerPartial } from 'egg';
import { FILE_BASE_URL_PROD } from '../app/constants';

export default () => {
	const config: PowerPartial<EggAppConfig> = {};
	const bizConfig = {
		mongoose: {
			client: {
				url: 'mongodb://docker_container_blog_mongodb:27017/blog-server',
				options: {
					useFindAndModify: false,
					useUnifiedTopology: true,
					useCreateIndex: true,
					user: 'blog',
					pass: 'blog',
				},
			},
		},
		upload: {
			urL: FILE_BASE_URL_PROD,
		},
		register: {
			support: false,
		},
	};
	return {
		...config,
		...bizConfig,
	};
};
