import Request from '~/api/requests/request';
import URLS from '~/api/requests/URLS';

export default {
    /**
     * getNotifications
     * 获取通知列表数据
     * 
     * 默认不传参数，则查询全部
     * 通知类型
     *  默认不传查全部
     *  system 系统通知
     *  replied 回复我的
     *  liked 点赞我的
     *  rewarded 支付我的
     *  related @我的
     *  withdrawal 提现通知
     * 
     *  rewarded,withdrawal (逗号拼接,支持传多个)
     */
    getNotifications(data) {
        return Request.get({
            url: URLS.NOTIFICATION,
            data
        });
    },
}