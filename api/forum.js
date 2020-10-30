import Request from '~/api/requests/request';
import RequestIncludes from '~/api/requests/requestIncludes';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * get forum
     * return PROMISE
     */
    getForum() {
        return Request.get({
            url: URLS.FORUM,
            includes: [
                RequestIncludes.USERS,
            ],
        });
    },
    getForumAndAgreements() {
        return Request.get({
            url: URLS.FORUM,
            data: {
                'filter[tag]': 'agreement'
            },
            includes: [
                RequestIncludes.USERS,
            ],
        });
    },
}