# online_wholesale_back

#### 介绍
线上批发后台接口系统，实现微后台服务

#### 软件架构
nodejs+express框架
软件架构说明

### 环境
nodejs V16.14.2 mysql v8

#### 安装教程

1.  npm install

### 运行
2.nodemon app.js

3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技


###
express框架

###
cors跨域

###
nodemon插件实现热更新

###
使用bodyParser解析传过来的表单数据
app.use(bodyParser.urlencoded({extended:true}))

###
mysql连接数据库

###
bcryptjs实现密码加密

###
Joi进行设置表单验证规则
配合@escook/express-joi进行中间件验证

###
jsonwebtoken设置token以及token过期时间，然后使用express-jwt将token解析到req的body中

