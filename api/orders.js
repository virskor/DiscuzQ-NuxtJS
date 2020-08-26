import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * post create order
     * return PROMISE
     */
    create(data) {
        return Request.post({
            url: URLS.ORDERS,
            data,
        });
    },
}