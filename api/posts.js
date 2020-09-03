import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';
import RequestIncludes from '~/api/requests/requestIncludes';


export default {
     /**
     * 创建回复
     */
    create(data) {
        return Request.post({
            url: URLS.POSTS,
            data,
        });
    },
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
    },
    /**
     * 获取单个评论
     * 
     * @param {*} postID 
     * @param {*} data 
     */
    getPost(postID) {
        return Request.get({
            url: `${URLS.POSTS}/${postID}`,
            includes: [
                RequestIncludes.USER,
                RequestIncludes.LIKED_USERS,
                RequestIncludes.COMMENT_POSTS,
                RequestIncludes.COMMENT_POSTS_USER,
                RequestIncludes.COMMENT_POSTS_USER_GROUPS,
                RequestIncludes.COMMENT_POSTS_REPLY_USER,
                RequestIncludes.COMMENT_POSTS_REPLY_USER_GROUPS,
                RequestIncludes.COMMENT_POSTS_MENTION_USERS,
                RequestIncludes.COMMENT_POSTS_IMAGES,
                RequestIncludes.IMAGES,
                RequestIncludes.ATTACHMENTS
            ]
        });
    },
}