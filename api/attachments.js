import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * 0 帖子附件 
     */
    UPLOAD_TYPE_THREAD_ATTACHMENT: 0,

    /**
     * 1 帖子图片
     */
    UPLOAD_TYPE_THREAD_IMAGES: 1,

    /**
     * 2 帖子音频
     */
    UPLOAD_TYPE_THREAD_VOICES: 2,

    /**
     * 3 帖子视频
     */
    UPLOAD_TYPE_THREAD_VIDEO: 3,

    /**
     * 4 消息图片
     */
    UPLOAD_TYPE_MESSAGE_IMAGES: 4,

    /**
     * 上传附件
     * 
     * demo
     * 
     * let formData = new FormData();
     * let imagefile = document.querySelector('#file');
     * formData.append("image", imagefile.files[0]);
     */
    upload(formData) {
        return Request.upload({
            url: URLS.ATTACHMENTS,
            formData,
        });
    },
    /**
     * 上传头像
     * @param {*} formData 
     */
    uploadAvatar(user, formData) {
        return Request.upload({
            url: `${URLS.USER}/${user.id}/avatar`,
            formData,
        });
    },
    /**
     * 删除附件
     * @param {*} formData 
     */
    delete(attachment) {
        return Request.delete({
            url: `${URLS.ATTACHMENTS}/${attachment.id}`
        });
    }
}