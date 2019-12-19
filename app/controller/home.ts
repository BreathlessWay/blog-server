import { Controller } from "egg";
import * as cheerio from "cheerio";

export default class HomeController extends Controller {
  public async index() {
    const { ctx, app } = this;
    console.log(this.ctx.isIOS);
    console.log(this.app.title);
    console.log(this.ctx.app.title);
    console.log(this.app.config.env);
    // ctx.redirect("/news/fff");
    ctx.set("X-EGG-NAME", app.title);
    // throw new Error("error");
    const res = await ctx.curl("http://www.nows.fun/", { dataType: "text" });
    if (res && res.data) {
      const $ = cheerio.load(res.data);
      ctx.body = $("#sentence").text();
    }
  }

  public async create() {
    const { ctx } = this;
    // 默认验证的是request.body的参数
    // 可以传递第二个参数指定校验的参数
    this.ctx.validate({
      title: { type: "string" },
      content: { type: "string" }
    });
    console.log(ctx.request.body);
    console.log(await ctx.getFileStream());

    ctx.body = "Hello Egg";
  }
}
