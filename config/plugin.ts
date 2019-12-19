import { EggPlugin } from "egg";

export const plugin: EggPlugin = {
  static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  validate: {
    enable: true,
    package: "egg-validate"
  },
  logrotator: {
    enable: true,
    package: "egg-logrotator"
  }
};

export default plugin;
