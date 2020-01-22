# 使用node的镜像
FROM node:10.16.3-alpine
# 在镜像中创建目录
# -p表示递归创建
RUN mkdir -p blog-server
# 进入工作目录，类似cd blog-server
WORKDIR /blog-server
# 将package.json npmrc拷贝到镜像中
COPY package.json /blog-server/package.json
COPY .npmrc /blog-server/.npmrc
# 安装npm依赖
RUN npm i
# 将运行文件拷贝到镜像
# .dockerignore声明的文件不会被拷贝
COPY . /blog-server
# 对外暴露端口
EXPOSE 7001
# 启动时运行的命令
CMD npm run deploy

