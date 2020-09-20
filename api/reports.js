import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * create report
     * return PROMISE
     */
    create(attributes) {
        const data = { 
            type: "reports", 
            attributes 
        };

        return Request.post({
            url: URLS.REPORTS,
            data,
        });
    },
}