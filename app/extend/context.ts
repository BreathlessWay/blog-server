import { Context } from "egg";

export default {
  get isIOS(this: Context) {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get("user-agent"));
  }
};
