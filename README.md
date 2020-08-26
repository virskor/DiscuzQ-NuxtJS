# DiscuzQ-NuxtJS
DiscuzQ 基于NuxtJS并支持后端渲染的PC HOME，来自第三方。  
目前我们不保证项目的交付日期

## 提示
目前我们将抽出部分PR，先完成一个light的版本，仅支持渲染帖子部分基础功能，后续将逐渐拓展feature。

关注： https://github.com/virskor/DiscuzQ  
预览： https://www.dehong.ren  


## Build Setup
参考下面的配置和启动命令，这样便可以快速启动项目。

### Nginx
你需要修改Discuz!Q API Nginx配置来支持cors跨域，参考： nginx.api.conf。  
前端参考nginx.frontend.conf进行Nginx反向代理。  
推荐使用腾讯云CDN进行加速访问。

### 启动命令

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