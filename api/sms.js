import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * send sms
     * return PROMISE
     */
    send(data) {
        return Request.post({
            url: URLS.SMS_SEND,
            data,
        });
    },
    /**
     * verify sms
     * return Promise
     */
    verify(data) {
        return Request.post({
            url: URLS.SMS_VERIFY,
            data,
        });
    },

}