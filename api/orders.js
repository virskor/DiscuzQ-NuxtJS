import Request from '~/api/requests/request';
import RequestIncludes from '~/api/requests/requestIncludes';
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
    /**
     * 支付
     * @param {*} orderSNID 
     */
    payOrder(orderSNID, data) {
        return Request.post({
            url: `${URLS.ORDERS_PAY}/${orderSNID}`,
            data
        });
    },
    /**
     * 查询订单
     */
    check(orderSNID) {
        return Request.get({
            url: `${URLS.ORDERS}/${orderSNID}`,
        });
    },
    /**
     * 查询订单列表
     */
    getOrders(data) {
        return Request.get({
            url: URLS.ORDERS,
            data,
            includes: [
                RequestIncludes.USER,
                RequestIncludes.THREAD,
                RequestIncludes.THREAD_FIRST_POST,
            ],
        });
    },
}