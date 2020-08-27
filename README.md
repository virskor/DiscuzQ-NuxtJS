# DiscuzQ-NuxtJS Light
DiscuzQ 基于NuxtJS并支持后端渲染的PC HOME，来自第三方。  
目前我们不保证项目的交付日期

## 版权提示
目前我们将抽出部分PR，先完成一个light的版本，仅支持渲染帖子部分基础功能，后续将逐渐拓展feature。  
#### 将这个项目用于开源社区，个人学习等非商业用途是不需要付费购买源代码使用权的。源码正版授权购买属于自愿原则（目的捐赠以获得持续的更新和使用指导建议，及维持演示站点服务器等费用）  
授权原则为单个域名，根据网站备案类型区分，企业用户授权与个人用户授权价格不一致。  
原价： 个人授权 288 企业授权 588  (Light Version 精简版)  
如您预定，我们将预计9月15日前交付可用于生产的RC版本  
如果使用有疑问欢迎添加微信： gentlevirs

### 已预授权域名查询（赞助者）
www.dehong.ren  

### 预览
关注： https://github.com/virskor/DiscuzQ  
预览： https://www.dehong.ren  


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

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3333
$ yarn dev

# build for production and launch server
# 可以将这个应用build 为单页面静态应用，默认是nuxt server side模式，universal
# 参考nuxt.js命令进行编译
$ yarn build

# 注意：yarn serve 会开启 后端api 代理，如果不需要则使用yarn start
# 生产环境下，请使用yarn serve来运行，这样便可以SSR
$ yarn serve

# yarn serve 会运行应用为production，并启用后端接口的反向代理
# 直接将Nuxtjs作为中间件运行在express.js，并不支持SSR
# 通常用于测试生产下是否能够正常运行，在进行部署
$ yarn start

# generate static project
$ yarn generate

# 简单生成环境运行
kill -9 $(lsof -i:3333 -t)
cd /root
rm -rf /home/www
git clone https://github.com/virskor/DiscuzQ-NuxtJS.git /home/www
cd /home/www
yarn install
yarn build
nohup yarn serve &
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### 工具
使用腾讯云CDN，可以编辑 cloud.config.js 来快速使用命令刷新cdn。拷贝cloud.config.js.bak文件并重新命名为 cloud.config.js。修改其中的SecretId等相关参数便可以使用下面的命令。  
```bash
# 刷新CDN
yarn refresh-cdn
```