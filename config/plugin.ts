import { EggPlugin } from "egg";
import { join } from "path";

export const plugin: EggPlugin = {
  static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  ua: {
    enable: true,
    path: join(__dirname, "../lib/plugin/egg-ua")
  }
};

export default plugin;
