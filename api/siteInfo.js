import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * get forum
     * return PROMISE
     */
    getSiteInfo() {
        return Request.get({
            url: URLS.SITE_INFO,
        });
    },
}