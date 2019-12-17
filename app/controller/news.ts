import { Controller } from "egg";

export default class NewsController extends Controller {
  async list() {
    const { ctx, service } = this;
    const page = ctx.query.page || 1;
    const newsList = await service.news.list(page);
    this.ctx.body = JSON.stringify(newsList);
  }
}
