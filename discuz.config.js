module.exports = {
    /**
     * 用于后端渲染的站点名称
     */
    ssr_sitename: 'Discuz!Q',

    /**
     * 用于后端渲染的 description
     */
    ssr_description: '',

    /**
     * head
     * 将在 index.html 插入的资源
     */
    head: {
        /**
         * 你可以再这里植入CSS 或者引用外部的JS，但不建议修改nuxt.config.js
         * 因为这样多处修改，并不利于你快速使用一份config启动你的APP
         */
        link: [
            { rel: 'stylesheet', href: '//at.alicdn.com/t/font_1989193_k75l2b7q3id.css' },
            { rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&display=swap' },
            { rel: 'stylesheet', href: '//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.css' },
        ],
        script: [
            {
                src: '//imgcache.qq.com/open/qcloud/video/tcplayer/libs/hls.min.0.13.2m.js'
            },
            {
                src: '//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.v4.1.min.js'
            }
        ],
    },

    /**
     * proxy
     * 生产环境下，建议不要使用反向代理接口，因为这样会非常影响性能
     * 
     */
    proxy: {
        /**
         * 这里dev是开发环境下的接口配置域名
         * 注意：
         * 配置的域名不应该发生301，302否则部分Request Methods无法跟随
         * 
         * 域名为 protocol + domain 后不需添加 / path
         * 
         */
        development: 'https://api.dehong.ren',

        /**
         * 生产环境下不建议开启，
         * 这里开启的原因只是为了方便大家体验
         * production: null
         */

        production: 'https://discuz.chat'
    },
    /**
     * API path
     * 注意： 这里指的是 API 请求的Path
     * 
     * 如果你开启了proxy，并需要将接口请求的地址直接转发到 host:port/api 下，那么不需要配置APIPath
     * 如果你的DiscuzQ 为独立部署的后端接口，并且没有配置proxy, 那么填写直接请求的域名
     * 
     * 如： https://api.example.com 不需要加斜杠。 也不要加path 
     * 正确： https://api.example.com 
     * 错误： https://api.example.com/api
     * 如果你开启了proxy(yarn serve) 那么不要配置这个
     */
    APIPath: {
        development: '',
        production: '',
    },

    /**
     * 是否配置了独立的手机版用于自动跳转
     * 当你开启responsive中的一些参数，在手机版中渲染，可能会发生改变
     */
    responsive: {
        /**
         * 是否允许手机访问
         * 
         * 如果为true，那么不会提示用户跳转到手机版
         * 如果为false，且配置了redirectDomain那么将在用户使用手机访问时，跳转到手机版继续
         */
        enableMobile: false,
        /**
         * 手机版下要跳转的域名
         * 不要加路径，仅协议+domain
         * h5前端站点部署域名
         * 将用于生成手机看帖二维码服务
         */
        redirectDomain: 'https://discuz.chat'
    },
    /**
     * 导航拓展
     * 数组
     * 内部对象解释
     * {
     *  caption: '标题', // String
     *  href: '链接', // String
     *  newWidow: false, // Boolean 
     * }
     */
    extendedNavigations: [
        { caption: '官方站点', href: 'https://discuz.chat', newWidow: true },
        { caption: 'API文档', href: 'https://discuz.com/api-docs/v1/', newWidow: true },
        { caption: '获取源码', href: 'https://github.com/virskor/DiscuzQ-NuxtJS', newWidow: true }
    ],
    /**
     * analytics
     * 统计代码
     * 
     * 你可以在这里独立配置统计代码，如果没有配置，则使用后台配置的统计代码
     */
    analytics: "",
    /**
     * 第三方登录
     */
    thirdpartyAuth: {
        wechat: true,
        qq: false,
    },
    /**
     * 主题色调
     */
    theme: {
        themes: {
          light: {
            /**
             * primary
             */
            primary: '#1878f3',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          }
        }
      }
}