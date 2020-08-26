import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * get wallet
     * return PROMISE
     */
    getUserWallet(uid) {
        return Request.get({
            url: `${URLS.WALLET_USER}/${uid}`,
        });
    },
}