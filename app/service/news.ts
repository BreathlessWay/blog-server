import { Service } from "egg";

export interface NewsItemType {
  id: string;
  author_id: string;
  tab: "share";
  content: string;
  last_reply_at: string;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: string;
  author: any;
}

export default class NewsService extends Service {
  public async list(page: number = 1): Promise<NewsItemType[]> {
    // read config
    const { serverUrl, pageSize } = this.config.news;
    // use build-in http client to GET hacker-news api
    const { data } = await this.ctx.curl(`${serverUrl}/topics`, {
      data: {
        page,
        limit: pageSize
      },
      dataType: "json"
    });
    // parallel GET detail
    return data;
  }
}
