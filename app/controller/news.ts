import { Controller } from "egg";

export default class NewsController extends Controller {
  async list() {
    const { ctx, service } = this;
    const page = ctx.query.page || 1;
    console.log(ctx.params.id);
    console.log(ctx.request.body);

    const newsList = await service.news.list(page);
    this.ctx.body = JSON.stringify(newsList);
  }
}
