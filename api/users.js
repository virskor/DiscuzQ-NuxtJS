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
                requestIncludes.TO_USER,
                requestIncludes.TO_USER_GROUPS
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
                requestIncludes.FROM_USER,
                requestIncludes.FROM_USER_GROUPS
            ]
        });
    },

}