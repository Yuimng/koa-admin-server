# koa-admin-server

本项目是基于**Node**、**Koa**、**Typescript**、**mysql** 制作的 admin 后台管理系统服务端

## 启动后端服务流程

1. 自己创建数据库表
2. 导入 ym_admin.sql 初始数据
3. 将根路径的 .env.yours的数据库内容修改为你自己的 并将后缀名 **.yours** 删除
4. 在config文件下创建 keys/private-key.pem  keys/public-key.pem, 分别为私钥和公钥匙，自己生成
     生成私钥公钥  [地址](https://blog.csdn.net/qq_41768644/article/details/140533819) 
```shell
openssl genrsa -out private-key.pem 2048
openssl rsa -in private_key.pem -pubout -out public-key.pem
```
5. 执行命令
```shell
# 安装包
pnpm i

# 启动项目
pnpm run dev
```

##  初始数据关于数据库初始化同步（ps:不使用直接导入 ym_admin.sql文件的方式）
1. src/app/index.ts 文件下有以下同步代码

```
// import synchonize from '../models/sync'
// synchonize()
```
2. 解除注释，pnpm run dev 执行数据库会完全初始化数据
3. 具体初始化的数据看 src/models/sync.ts
4. 初始化之后记得**重新注释**，不然每次都初始化数据

（ps: 初始化的数据相较于直接导入 ym_admin.sql 少了一些菜单数据）

