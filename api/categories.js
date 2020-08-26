import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * get forum
     * return PROMISE
     */
    getCategories() {
        return Request.get({
            url: URLS.CATEGORIES,
        });
    },
}