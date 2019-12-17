import { Controller } from "egg";

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    console.log(this.ctx.isIOS);
    console.log(this.app.title);
    console.log(this.ctx.app.title);
    console.log(this.app.config.env);
    ctx.body = "Hello Egg";
  }
}
