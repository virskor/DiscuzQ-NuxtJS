# DiscuzQ-NuxtJS Lite
DiscuzQ 基于NuxtJS并支持后端渲染的PC HOME，来自第三方。  
目前我们不保证项目的交付日期

## 版权提示
目前我们将抽出部分PR，先完成一个Lite的版本，仅支持渲染帖子部分基础功能，后续将逐渐拓展feature。  
本打算出个Pro收费的。收毛费，免费，随便玩。  
谢谢打赏  
<p><img width="200px" src="./assets/wechat.png"/> </p>


### 已预授权域名查询（赞助者）
www.dehong.ren  

### 预览
关注： https://github.com/virskor/DiscuzQ  
预览： https://www.clodra.com


## Build Setup
参考下面的配置和启动命令，这样便可以快速启动项目。

### Nginx
你需要修改Discuz!Q API Nginx配置来支持cors跨域，参考： nginx.api.conf。  
前端参考nginx.frontend.conf进行Nginx反向代理。  
推荐使用腾讯云CDN进行加速访问。

### 启动命令

#### 一键启动
使用一键启动，意味着不在乎反向代理导致的性能降低。那么您只需要修改 discuz.config.js 中的域名，与Discuz!Q 后端域名地址一致即可，之后再运行下面的指令。  
```bash
yarn build
yarn serve
```  
然后访问 http://127.0.0.1:3333 即可使用，nginx配置参考nginx.frontend.conf

### 构建方式
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3333
$ yarn dev

# build for production and launch server
# 可以将这个应用build 为单页面静态应用，默认是nuxt server side模式，universal
# 参考nuxt.js命令进行编译
$ yarn build

# yarn start 会运行应用为production，并启用后端接口的反向代理
$ yarn start

# 简单生成环境运行
kill -9 $(lsof -i:3333 -t)
cd /root
rm -rf /home/www
git clone https://github.com/virskor/DiscuzQ-NuxtJS.git /home/www
cd /home/www
yarn install
yarn build
nohup yarn start &
```
### 使用腾讯云Serverless云函数部署（免购买服务器和运行环境）
您可以参考这个连接，https://cloud.tencent.com/document/product/1154/44066 。或者直接参照下面的方式部署。 注意内存至少1024M。   
通过 npm 全局安装 Serverless CLI：  
```sh
$ npm install -g serverless
```
要想使用项目中自带的yml文件，则直接执行部署，否则参照下面生成配置文件。  
```
$ sls deploy
```
在项目根目录创建 serverless.yml 文件：  
```sh
$ touch serverless.yml
``` 
在 serverless.yml 中进行如下配置：  
```yml
# serverless.yml
component: nuxtjs # (必填) 组件名称，此处为 nuxtjs
name: nuxtjsDemo # (必填) 实例名称
org: orgDemo # (可选) 用于记录组织信息，默认值为您的腾讯云账户 APPID
app: appDemo # (可选) 该 nuxt.js 项目名称
stage: dev # (可选) 用于区分环境信息，默认值是 dev

inputs:
  src:
    src: ./src
    exclude:
      - .env
  region: ap-guangzhou
  runtime: Nodejs10.15
  apigatewayConf:
    protocols:
      - http
      - https
    environment: release
```
部署完成后，使用CDN访问部署生成的域名地址。并配置相同的回源host即可。   

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### 工具
使用腾讯云CDN，可以编辑 cloud.config.js 来快速使用命令刷新cdn。拷贝cloud.config.js.bak文件并重新命名为 cloud.config.js。修改其中的SecretId等相关参数便可以使用下面的命令。  
```bash
# 刷新CDN
yarn refresh-cdn
```