import Request from '~/api/requests/request';
import RequestIncludes from '~/api/requests/requestIncludes';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * get threads
     * return PROMISE
     */
    getThreads(data) {
        return Request.get({
            url: URLS.THREADS,
            data,
            includes: [
                RequestIncludes.USER,
                RequestIncludes.USERS_GROUPS,
                RequestIncludes.FIRST_POST,
                RequestIncludes.FIRST_POST_IMAGES,
                RequestIncludes.CATEGORY,
                RequestIncludes.THREAD_VIDEO
            ],
        });
    },
    /**
     * get thread
     */
    getThread(threadID, data) {
        return Request.get({
            url: `${URLS.THREADS}/${threadID}`,
            data,
            includes: [
                RequestIncludes.USER,
                RequestIncludes.USERS_GROUPS,
                RequestIncludes.FIRST_POST,
                RequestIncludes.FIRST_POST_IMAGES,
                RequestIncludes.CATEGORY,
                RequestIncludes.THREAD_VIDEO,
                RequestIncludes.USERS_GROUPS_PERMISSION_WITHOUT_CATEGORIES,
                RequestIncludes.POSTS,
                RequestIncludes.POSTS_USER,
                RequestIncludes.POSTS_IMAGES,
                RequestIncludes.USERS_GROUPS,
                RequestIncludes.REWARDED_USERS
            ],
        });
    },
    /**
     * favorite
     * 收藏主题
     */
    favorite(threadID, isFavorite) {

        const data = {
            id: threadID,
            type: "threads",
            attributes: { isFavorite }
        };

        return Request.patch({
            url: `${URLS.THREADS}/${threadID}`,
            data,
        });
    },
    /**
     * favorites
     * 查询收藏的主题列表
     */
    favorites(data) {
        return Request.get({
            url: URLS.FAVORITES,
            data,
            includes: [
                RequestIncludes.USER,
                RequestIncludes.USERS_GROUPS,
                RequestIncludes.FIRST_POST,
                RequestIncludes.FIRST_POST_IMAGES,
                RequestIncludes.CATEGORY,
                RequestIncludes.THREAD_VIDEO,
                RequestIncludes.USERS_GROUPS,
                RequestIncludes.REWARDED_USERS
            ],
        });
    },
    /**
     * 查询点赞的主题
     */
    likes(data) {
        return Request.get({
            url: `${URLS.THREADS}/likes`,
            data,
            includes: [
                RequestIncludes.USER,
                RequestIncludes.USERS_GROUPS,
                RequestIncludes.FIRST_POST,
                RequestIncludes.FIRST_POST_IMAGES,
                RequestIncludes.CATEGORY,
                RequestIncludes.THREAD_VIDEO,
                RequestIncludes.USERS_GROUPS,
            ],
        });
    },
    /**
     * 删除主题
     */
    deleteThread(threadID) {
        return Request.delete({
            url: `${URLS.THREADS}/${threadID}`
        });
    }
}