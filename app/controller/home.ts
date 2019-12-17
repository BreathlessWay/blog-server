import { Controller } from "egg";

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    console.log(this.ctx.isIOS);
    ctx.body = "Hello Egg";
  }
}
