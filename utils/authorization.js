
import consts from '~/utils/consts'

export default class Authorization {


    /**
     * 获取token
     * 返回一个对象，如果空则返回null
     */
    getAccessToken() {
        const token = window.localStorage.getItem(consts.STORAGE_AUTHORIZATION);
        return token ? JSON.parse(token) : null;
    }

    /**
     * 存储新的token信息
     * token 仅存储 attributes对象
     */
    setAccessToken(data) {
        if (typeof data != 'object') {
            throw 'Attributes should be an object';
        }

        window.localStorage.setItem(consts.STORAGE_AUTHORIZATION, JSON.stringify(data));
    }

    /**
     * 清空
     */

    clear() {
        window.localStorage.clear();
    }

}