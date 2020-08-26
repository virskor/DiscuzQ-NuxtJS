import Request from '~/api/requests/request';
import RequestIncludes from '~/api/requests/requestIncludes';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * get current user
     */
    getTopics(data) {
        return Request.get({
            url: `${URLS.TOPICS}`,
            data,
            includes: [
                RequestIncludes.USER,
                RequestIncludes.LAST_THREAD,
                RequestIncludes.LAST_THREAD_FIRST_POST,
                RequestIncludes.LAST_THREAD_FIRST_POST_IMAGES
            ],
        });
    },
    /**
     * 与上面的获取话题的方式不同
     * 该查询方式仅抱哈用户数据，不会包含帖子信息，仅用于RecentTopics查询
     * @param {*} data 
     */
    getRecentTopics(data) {
        return Request.get({
            url: `${URLS.TOPICS}`,
            data,
        });
    },
    /**
     * 获取话题详情
     */
    getTopicDetail(ID) {
        return Request.get({
            url: `${URLS.TOPICS}/${ID}`,
        });
    },
}