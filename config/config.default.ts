import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1576490696679_2138";

  // add your egg config in here
  config.middleware = ["robot"];

  // 应用本身的配置
  const bizConfig = {
    robot: {
      ua: [/Baiduspider/i]
    },
    news: {
      pageSize: 30,
      serverUrl: "https://cnodejs.org/api/v1"
    }
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
