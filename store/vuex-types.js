/**
 * Getters
 * 本地应用配置信息，用与非接口设计类的前端应用配置状态
 */
export const GETTERS_APPCONF = "getters/appConf";
/**
 * 网站启动信息
 * 从API获取的启动信息
 * https://discuz.com/api-docs/v1/forum.html
 */

export const GETTERS_FORUM = "getters/forum";

/**
 * 站点信息
 * site_info
 */
export const GETTERS_SITE_INFO = "getters/siteInfo";

/**
 * 登录用户信息
 * 
 */
export const GETTERS_USER = "getters/user";
/**
 * 登录用户的UID
 */
export const GETTERS_LOGIN_USERID = "getters/loginUserID";
/**
 * 筛选器状态
 */
export const GETTERS_FILTER = "getters/filter";


/**
 * 分类
 * 
 */
export const GETTERS_CATEGORIES = "getters/categories";

/** 
 * Mutations 对应setter
*/
export const MUTATION_APPCONF = "mutation/appConf";
export const MUTATION_FORUM = "mutation/forum";
export const MUTATION_USER = "mutation/user";
export const MUTATION_LOGIN_USERID = "mutation/loginUserID";
export const MUTATION_SITE_INFO = "mutation/siteInfo";
export const MUTATION_CATEGORIES = "mutation/categories";
export const MUTATION_FILTER = "mutation/filter";