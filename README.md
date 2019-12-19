### 个人博客

> Git

1. git config -l: 查看 git 的相关配置
2. git config user.name/user.email: 修改提交 git 仓库的用户信息
3. git branch `name`: 查看/创建分支
4. git push origin `branch name`: 提交分支到远程

> Node

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

> Nginx

// TODO

> Jenkins

// TODO

> Docker

1. docker-network: 多 docker 直接通信
2. docker 容器:
   - client
   - mongodb
   - server
3. docker-compose: 用于定义和运行多容器
4. docker volume: 部署 Jenkins, 持续集成

> 图片上传

1. [图壳](https://juejin.im/post/5df6d7bf6fb9a0160c412051)

2. [egg上传文件](https://eggjs.org/zh-cn/basics/controller.html#%E8%8E%B7%E5%8F%96%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%96%87%E4%BB%B6)
