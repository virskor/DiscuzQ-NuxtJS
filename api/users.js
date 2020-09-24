import Request from '~/api/requests/request';
import RequestIncludes from '~/api/requests/requestIncludes';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * get forum
     * return PROMISE
     */
    login(data) {
        return Request.post({
            url: URLS.LOGIN,
            data,
        });
    },
    /**
     * get users
     */
    getUsers(data) {
        return Request.get({
            url: URLS.USER,
            data,
            includes: [
                RequestIncludes.GROUPS
            ],
        });
    },
    /**
     * get current user
     */
    getUser(userID) {
        return Request.get({
            url: `${URLS.USER}/${userID}`,
            includes: [
                RequestIncludes.GROUPS
            ],
        });
    },
    /**
     * register
     */
    register(data) {
        return Request.post({
            url: URLS.REGISTER,
            data,
        });
    },
    /**
    * search
    */
    searchUsers(data) {
        return Request.get({
            url: URLS.USER,
            data,
            includes: [
                RequestIncludes.GROUPS,
            ],
        });
    },
    /**
     * 创建关注关系
     */
    follow(to_user_id) {
        const data = {
            type: "user_follow",
            attributes: { to_user_id }
        };

        return Request.post({
            url: URLS.FOLLOW,
            data,
        });
    },
    /**
     * 删除关注关系
     * type	int	是	要操作的类型（1：删除关注 2：删除粉丝）
     */
    unfollow(to_user_id, type) {
        return Request.delete({
            url: `${URLS.FOLLOW}/${to_user_id}/${type || 1}`,
        });
    },

    /** 查询TA关注的人 */
    followToUser(data) {
        return Request.get({
            url: URLS.FOLLOW,
            data,
            includes: [
                RequestIncludes.TO_USER,
                RequestIncludes.TO_USER_GROUPS
            ]
        });
    },

    /**
     * 查询关注Ta的人
     */
    followFromUser(data) {
        return Request.get({
            url: URLS.FOLLOW,
            data,
            includes: [
                RequestIncludes.FROM_USER,
                RequestIncludes.FROM_USER_GROUPS
            ]
        });
    },
    /**
     * modify profile
     * fields: {
     * username: ''
     * }
     */
    profile(user, fields) {
        const data = { 
            id: user.id, 
            type: "users", 
            attributes: { ...fields } 
        };

        return Request.patch({
            url: `${URLS.USER}/${user.id}`,
            data,
        });
    },
    /**
     * 屏蔽
     */
    deny(user) {
        const data = {
            type: `users/${user.id}/deny`,
            attributes: {  }
        };

        return Request.post({
            url: `${URLS.USER}/${user.id}/deny`,
            data,
        });
    },
    /**
     * 取消屏蔽
     */
    undeny(user) {
        return Request.delete({
            url: `${URLS.USER}/${user.id}/deny`,
        });
    },
}