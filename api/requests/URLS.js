import C from '~/utils/common';
import discuzConf from '~/discuz.config';

/**
 * 在这里更新请求的域名
 * 注意，域名不应该存在301或者302以免POST 等无法跟随
 * 
 * isDevelopement 请不要修改
 * 如果要修改开发环境的接口地址，请修改/dev.js中的 proxy address
 * isDevelopement下，接口的地址是被代理的，只有生产下才会用APIHOST中设置的地址
 */
let APIHOST = C.isDevelopement() ? discuzConf.APIPath.development : discuzConf.APIPath.production;

/**
 * 后端渲染时，接口请求将在node执行，所以要补全api地址
 */
if (process.server) {
    if (!APIHOST) {
        APIHOST = 'http://127.0.0.1:3333';
    }
}

const APIVERSION = '/api';

const URLS = {

    /**
     * GET api/forum 前端获取配置接口
     * https://discuz.com/api-docs/v1/forum.html
     * todo: 这个接口将在Nuxt中被缓存
     */
    FORUM: `${APIHOST}${APIVERSION}/forum`,

    /**
     * GET api/siteinfo 获取炸点信息
     * https://discuz.com/api-docs/v1/siteinfo.html
     * 
     */
    SITE_INFO: `${APIHOST}${APIVERSION}/siteinfo`,

    /**
     * 用户类接口
     * 用户接口管理分类
     * 
     * DELETE：/api/users 批量删除用户
     * https://discuz.com/api-docs/v1/delete-users.html
     * 
     * POST: /api/users/{id}/avatar 上传头像
     * DELETE: /api/users/{id}/avatar 删除头像
     * https://discuz.com/api-docs/v1/upload-avatar.html
     * 
     * PATCH： /api/users/{id} 用户资料修改
     * https://discuz.com/api-docs/v1/update-user.html
     * 
     * GET /api/users/{id} 获取用户信息
     * https://discuz.com/api-docs/v1/userprofile.html
     * 
     * GET  /api/users 搜索用户
     * https://discuz.com/api-docs/v1/userslist.html
     * 
     * PATCH /api/users/real 实名认证
     * https://discuz.com/api-docs/v1/update-user-real.html
     * 
     * POST /api/users/pay-password/reset 修改支付密码
     * https://discuz.com/api-docs/v1/ResetPayPassword.html
     * 
     * POST /users/{id}/deny 拉黑用户
     * https://discuz.com/api-docs/v1/create-deny-user.html
     * 
     * DELETE /users/{id}/deny 取消拉黑
     * https://discuz.com/api-docs/v1/delete-deny-user.html
     * 
     * GET  /api/users/{id}/deny 拉黑的列表
     * https://discuz.com/api-docs/v1/list-deny-user.html
     */

    USER: `${APIHOST}${APIVERSION}/users`,

    /**
     * POST /api/register 用户注册
     * https://discuz.com/api-docs/v1/register.html
     */

    REGISTER: `${APIHOST}${APIVERSION}/register`,

    /**
    * POST /api/login 用户登录
    * https://discuz.com/api-docs/v1/login.html
    */
    LOGIN: `${APIHOST}${APIVERSION}/login`,

    /**
     * REDIRECT /oauth/wechat 微信登录
     * 将打开页面进行回调登录处理
     * 非RESTFUL API
     * https://discuz.com/api-docs/v1/wechat-login.html
     */
    OAUTH_WECHAT: `${APIHOST}/oauth/wechat`,

    /**
     * GET  /api/oauth/wechat/user 微信用户登录换取TOKEN接口
     * https://discuz.com/api-docs/v1/wechat-user.html
     */
    OAUTH_WECHAT_TOKENEXHANGE: `${APIHOST}${APIVERSION}/oauth/wechat/user`,

    /**
     * GET  /api/oauth/wechat/web/user PC微信扫码登录生成二维码接口
     * https://discuz.com/api-docs/v1/wechat-pc-user-qrcode.html
     */
    OAUTH_WECHAT_WEB_USER: `${APIHOST}${APIVERSION}/oauth/wechat/web/user`,


     /**
     * GET  /api/oauth/wechat/web/user/serach PC微信扫码登录查询用户扫码状态接口
     * https://discuz.com/api-docs/v1/wechat-pc-user-search.html
     */
    OAUTH_WECHAT_WEB_USER_SEARCH: `${APIHOST}${APIVERSION}/oauth/wechat/web/user/serach`,


    /**
     * POST /api/refresh-token 刷新token
     * https://discuz.com/api-docs/v1/RefreshToken.html
     */
    REFRESH_TOKEN: `${APIHOST}${APIVERSION}/refresh-token`,

    /**
     * POST /sms/send 发送短信
     * https://discuz.com/api-docs/v1/sms-send.html
     */
    SMS_SEND: `${APIHOST}${APIVERSION}/sms/send`,

    /**
     * POST /sms/verify 校验短信
     * https://discuz.com/api-docs/v1/sms-verify.html
     */
    SMS_VERIFY: `${APIHOST}${APIVERSION}/sms/verify`,

    /**
    * GET /api/categories 查询分类列表
    * https://discuz.com/api-docs/v1/CategoryList.html
    */
    CATEGORIES: `${APIHOST}${APIVERSION}/categories`,

    /**
     * GET api/threads 查询主题列表
     * https://discuz.com/api-docs/v1/ThreadResource.html
     */
    THREADS: `${APIHOST}${APIVERSION}/threads`,

    /**
     * GET api/topics 查询话题列表
     * https://discuz.com/api-docs/v1/TopicList.html
     */
    TOPICS: `${APIHOST}${APIVERSION}/topics`,

    /**
     * GET api/wallet/users/{id} 查询用户钱包
     * https://discuz.com/api-docs/v1/UserWalletResource.html
     */
    WALLET_USER: `${APIHOST}${APIVERSION}/wallet/user`,

    /**
     * PATCH POST GET api/posts/{id} 评论相关API请求
     * https://discuz.com/api-docs/v1/PostCreate.html
     */
    POSTS: `${APIHOST}${APIVERSION}/posts`,

    /**
     * GET api/notification 通知
     * https://discuz.com/api-docs/v1/NotificationList.html
     */
    NOTIFICATION: `${APIHOST}${APIVERSION}/notification`,

    /**
     * GET DELETE POST api/follow 创建关注关系
     * https://discuz.com/api-docs/v1/UserFollowCreate.html
     */
    FOLLOW: `${APIHOST}${APIVERSION}/follow`,

    /**
     * GET api/favorites 查询我收藏的主题接口[列表]
     * https://discuz.com/api-docs/v1/MyFavorite.html
     */
    FAVORITES: `${APIHOST}${APIVERSION}/favorites`,
}

export default URLS
