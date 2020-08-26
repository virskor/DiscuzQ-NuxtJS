import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    getQRcode() {
        return Request.get({
            url: URLS.OAUTH_WECHAT_WEB_USER,
        });
    },
}