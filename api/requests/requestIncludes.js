const requestIncludes = {
    /**
     * users
     * 用户
     */
    USERS: 'users',

    /**
     * user
     * 用户
     */
    USER: 'user',

    /**
     * user.groups
     * 用户用户组
     */

    USERS_GROUPS: 'user.groups',

    /**
     * user.groups.permissionWithoutCategories
     * 用户用户组
     */

    USERS_GROUPS_PERMISSION_WITHOUT_CATEGORIES: 'user.groups.permissionWithoutCategories',

    /**
     * thread
     * 帖子
     */
    THREAD: 'thread',

    /**
     * firstPost
     * 首贴
     */
    FIRST_POST: 'firstPost',

    /**
     * firstPost
     * 首贴
     */
    THREAD_FIRST_POST: 'thread.firstPost',

    /**
     * firstPost.mentionUsers
     * 首贴提到的用户
     */
    FIRST_POST_MENTION_USERS: 'firstPost.mentionUsers',

    /**
     * threadVideo
     * 帖子包含的视频
     */
    THREAD_VIDEO: 'threadVideo',

    /**
     * lastPostedUser
     * 查询最后回复的用户
     */
    LAST_POSTED_USER: 'lastPostedUser',

    /**
     * category
     * 查询分类
     */
    CATEGORY: 'category',

    /**
     * deletedUser
     * 删除用户
     */
    DELETEUSER: 'deletedUser',

    /**
     * firstPostImages
     * 首贴图片
     */
    FIRST_POST_IMAGES: 'firstPost.images',

    /**
     * firstPost.attachments
     * 首贴附件
     */
    FIRST_POST_ATTACHMENTS: 'firstPost.attachments',

    /**
     * firstPostLikedUsers
     * 点赞首贴的用户
     */
    FIRST_POST_LIKED_USERS: 'firstPost.likedUsers',

    /**
     * lastThreePosts
     * 最后三条回复
     */
    LAST_THREE_POSTS: 'lastThreePosts',

    /**
     * lastThread
     * 最后发布的主题
     */
    LAST_THREAD: 'lastThread',

    /**
     * lastThreadFirstPost
     * 最后发布的主题关联的POST
     */
    LAST_THREAD_FIRST_POST: 'lastThread.firstPost',

    /**
     * lastThreadFirstPostImages
     * 最新帖子POST关联的首贴图片
     */
    LAST_THREAD_FIRST_POST_IMAGES: 'lastThread.firstPost.images',

    /**
     * lastThreePosts.user
     * 最后三条回复的用户信息
     */
    LAST_THREE_POSTS_USER: 'lastThreePosts.user',
    
    /**
     * lastThreePostsReplyUser
     * 最后三条回复所回复的用户
     */
    LAST_THREE_POSTS_REPLY_USER: 'lastThreePosts.replyUser',

    /**
     * replyUser
     */
    REPLY_USER: 'replyUser',

    /**
     * rewardedUsers
     * 打赏主题的用户
     */
    REWARDED_USERS: 'rewardedUsers',

    /**
     * lastDeletedLog
     * 最后一次被删除的操作日志
     */
    LAST_DELETED_LOG: 'lastDeletedLog',

    /**
     * toUser
     * 关注用户数据
     */
    TO_USER: 'toUser',

    /**
     * images
     * 图片
     */
    IMAGES: 'images',

    /**
     * toUser.groups
     * 关注用户数据 用户组
     */
    TO_USER_GROUPS: 'toUser.groups',

    /**
     * replyUser
     * 回复的用户
     */
    POST_REPLY_USER: 'posts.replyUser',

    /**
     * posts 
     * 评论
     */
    POSTS: 'posts',

    /**
     * posts.user
     * 评论的用户
     */
    POSTS_USER: 'posts.user',

    /**
     * posts.likedUsers
     * 评论点赞的用户
     */
    POSTS_LIKED_USER: 'posts.likedUsers',

    /**
     * postsImages
     * 评论的图片
     */
    POSTS_IMAGES: 'posts.images',

    /**
     * posts.mentionUsers
     * 评论提到的用户
     */
    POSTS_MENTION_USERS: 'posts.mentionUsers',

    /**
     * fromUser
     * 粉丝用户数据
     */
    FROM_USER: 'fromUser',

    /**
     * fromUserGroups
     * 粉丝用户数据
     */
    FROM_USER_GROUPS: 'fromUser.groups',

    /**
     * groups
     * 指定获取用户组信息
     */
    GROUPS: 'groups',

    /**
     * wechat
     * 指定获取用户组信息关联的微信
     */
    WECHAT: 'wechat',

    /**
     * 最后三条回复
     */
    LAST_THREE_COMMENTS: 'lastThreeComments',

    /**
     * 最后三条回复的发布用户
     */
    LAST_THREE_COMMENTS_USER: 'lastThreeComments.user',

    /**
     * 最后三条回复的回复用户
     */
    LAST_THREE_COMMENTS_REPLY_USER: 'lastThreeComments.replyUser',

    /**
     * 将Includes转化为 queries
     * 
     */
    toRequestQueries(includes) {
        if (typeof includes != 'object' || includes.length == 0) {
            throw 'Includes should be Array and not empty';
        }

        return includes.map((e) => e).join(',');
    }
};

export default requestIncludes;