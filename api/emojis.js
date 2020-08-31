import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * get emoji list
     * return PROMISE
     */
    getEmojis() {
        return Request.get({
            url: URLS.EMOJI,
        });
    },
}