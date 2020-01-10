import { Context, EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { JWT_SECRET } from '../app/constants';

export default (appInfo: EggAppInfo) => {
	const config = {} as PowerPartial<EggAppConfig>;

	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1576490696679_2138';

	// add your egg config in here
	config.middleware = ['errorHandler', 'notfoundHandler', 'compress'];

	config.compress = {
		threshold: 2048,
	};
	// 框架中内置了安全插件 egg-security，提供了一些默认的安全实践，并且框架的安全插件是默认开启的
	// config.security = {
	//   csrf: false
	// };

	config.security = {
		csrf: {
			headerName: 'X-XSRF-TOKEN', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
		},
	};
	// 开启此模式后，应用就默认自己处于反向代理之后，会支持通过解析约定的请求头来获取用户真实的 IP，协议和域名。
	// 如果你的服务未部署在反向代理之后，请不要开启此配置，以防被恶意用户伪造请求 IP 等信息
	config.proxy = true;

	// 默认 body 最大长度为 100kb
	// 如果用户的请求 body 超过了我们配置的解析最大长度，会抛出一个状态码为 413 的异常
	// 如果用户请求的 body 解析失败（错误的 JSON），会抛出一个状态码为 400 的异常。
	config.bodyParser = {
		jsonLimit: '1mb',
		formLimit: '1mb',
	};
	// 为了保证文件上传的安全，框架限制了支持的的文件格式
	// 增加扩展名的文件支持
	config.multipart = {
		fileExtensions: ['.doc', '.docx', '.wps', '.page'],
	};

	//  egg-scripts启动的域名和端口
	config.cluster = {
		listen: {
			port: 7001,
			hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
			// path: '/var/run/egg.sock',
		},
	};
	config.onerror = {
		all(err, ctx: Context) {
			ctx.logger.error(err);
			// 在此处定义针对所有响应类型的错误处理方法
			// 注意，定义了 config.all 之后，其他错误处理方法不会再生效
			ctx.body = err;
			ctx.status = 500;
		},
	};

	config.cluster = {
		listen: {
			port: 7001,
			hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
		},
	};

	// 应用本身的配置
	const bizConfig = {
		mongoose: {
			client: {
				url: 'mongodb://127.0.0.1/blog-server',
				options: {
					useFindAndModify: false,
					useUnifiedTopology: true,
					useCreateIndex: true,
				},
			},
		},
		jwt: {
			secret: JWT_SECRET,
		},
	};
	// the return config will combines to EggAppConfig
	return {
		...config,
		...bizConfig,
	};
};
