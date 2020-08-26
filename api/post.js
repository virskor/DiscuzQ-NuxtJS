import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';
import RequestIncludes from '~/api/requests/requestIncludes';


export default {
    /**
     * like
     * 点赞反选
     */
    like(postID, isLiked) {

        const data = {
            id: postID,
            type: "posts",
            attributes: { isLiked }
        };

        return Request.patch({
            url: `${URLS.POSTS}/${postID}`,
            data,
        });
    },
    /**
     * 查询帖子关联的评论
     */
    getThreadPosts(data) {
        return Request.get({
            url: URLS.POSTS,
            data,
            includes: [
                RequestIncludes.USERS_GROUPS,
                RequestIncludes.REPLY_USER,
                RequestIncludes.IMAGES,
                RequestIncludes.LAST_THREE_COMMENTS,
                RequestIncludes.LAST_THREE_COMMENTS_USER,
                RequestIncludes.LAST_THREE_COMMENTS_REPLY_USER
            ]
        });
    }
}