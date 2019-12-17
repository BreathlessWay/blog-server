import { Context } from "egg";

// 注意：Middleware 目前返回值必须都是 any，
// 否则使用 route.get/all 等方法的时候因为 Koa 的 IRouteContext 和 Egg 自身的 Context 不兼容导致编译报错。
const robot = (options): any => {
  return async function robotMiddleware(
    ctx: Context,
    next: () => Promise<any>
  ) {
    const source = ctx.get("user-agent") || "";
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = "Go away, robot.";
    } else {
      await next();
    }
  };
};

export default robot;
