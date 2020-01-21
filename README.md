### 个人博客

> Git

1. git config -l: 查看 git 的相关配置
2. git config user.name/user.email: 修改提交 git 仓库的用户信息
3. git branch <branch name>: 查看/创建分支
4. git push --set-upstream origin <branch name>: 提交分支到远程
5. git branch -a: 查看所有分支，包括远程分支
6. git branch -d <branch name>: 删除本地分支
7. git push origin --delete <branch name>: 删除远程分支
8. git commit --no-verify -m "--no-verify 跳过检验规则": 提交忽略验证规则
9. 185.31.16.184 github.global.ssl.fastly.net: github 慢, 或者说是它的资源 host 被堵而已, 大家可以通过简单的 hosts 映射解决

> Node

1. [egg](https://eggjs.org/zh-cn/intro/)
2. egg 不支持 typescript 别名？？？
3. [nodemailer](https://nodemailer.com/about/), node 的邮件发送
4. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), 登录验证
5. egg-mongoose 的类型生成有问题, 需要自己手动 declare
6. 把入参放到 service 是不符合 controller/service/model 这样的设计, 应该在 controller 获取 query/params/body, 作为参数传入 service
7. egg 启动的服务要在外网访问需要配置
   ```
   //  egg-scripts启动的域名和端口
   config.cluster = {
       listen: {
           port: 7001,
           hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
           // path: '/var/run/egg.sock',
       },
   };
   ```

> Mongodb/Mongoose

1. [mongoose](http://www.mongoosejs.net/docs/guide.html)
2. [mongoose 深层修改问题](https://cnodejs.org/topic/50dde64ea7e6c6171a80a678): mongoose 在 update 时用\$set 的作用及问题, 以及深层修改的解决方法
3. 批量插入使用 Model.insertMany([...])
4. 批量更新可以循环, 或者使用[bulkWrite](http://www.mongoosejs.net/docs/api.html#bulkwrite_bulkWrite), 会批量执行`insertOne, updateOne, updateMany, replaceOne, deleteOne, and/or deleteMany`操作
5. 从 mongodb 中查出的数据的 \_id 默认是 ObjectId, 需要通过`_id.toSting()`, 转为普通 id
6. mongodb 获取当前查询条件下条目总数和获取当前分页需要查询两次

> 图片上传

1. [egg 上传文件](https://eggjs.org/zh-cn/basics/controller.html#%E8%8E%B7%E5%8F%96%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%96%87%E4%BB%B6), [demo](https://github.com/eggjs/examples/blob/master/multipart/app/controller/ajax.js)
