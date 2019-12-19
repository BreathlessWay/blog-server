export default app => {
  app.title = "aaa";
  // app.once("server", server => {
  //   // 该事件一个 worker 进程只会触发一次，在 HTTP 服务完成启动后，会将 HTTP server 通过这个事件暴露出来给开发者。
  //   console.log(server);
  // });
  // app.on("error", (err, ctx) => {
  //   // 运行时有任何的异常被 onerror 插件捕获后，都会触发 error 事件，将错误对象和关联的上下文（如果有）暴露给开发者，可以进行自定义的日志记录上报等处理。
  //   console.error(err);
  //   console.log(ctx);
  // });
  // 应用收到请求和响应请求时，分别会触发 request 和 response 事件，并将当前请求上下文暴露出来，开发者可以监听这两个事件来进行日志记录。
  // app.on("request", ctx => {
  //   // log receive request
  //   console.log(ctx);
  // });
  // app.on("response", ctx => {
  //   // ctx.starttime is set by framework
  //   console.log(ctx);
  //   // log total cost
  // });

  app.messenger.on("agent_action", data => {
    console.log(data);
  });
};

declare module "egg" {
  interface Application {
    title: string;
  }
}
