import ordersAPI from "~/api/orders";


export default {
    methods: {
        /**
         * 支付订单
         * 只需要将这个方法mixin到需要调用支付的组件，传入创建的订单对象，支付类型即可
         * @param {*} order 
         * @param {*} type 
         */
        async pay(order, type) {

            if (!order || !type) {
                return false;
            }

            const orderSN = order.attributes.order_sn || '';
            if (!orderSN) {
                return false;
            }

            const data = {
                order_sn: orderSN,
                payment_type: type,
                // pay_password
                // pay_password: 
            };

            const rs = await ordersAPI.payOrder(orderSN, data);
            
            if (rs) {
                /**
                 * 如果是钱包支付，直接返回支付结果
                 */
                if (!this.$_.isEmpty(rs.data.attributes.wallet_pay)) {
                    const paid = rs.data.attributes.wallet_pay.result == "success" ? true : false;
                    if (!paid) {
                        await this.$swal(rs.data.attributes.wallet_pay.message);
                    }
                    return paid;
                }

                /**
                 * 如果是微信支付，则展示二维码让用户扫码
                 * 微信支付需要$swal关闭后，在查询支付结果，并返回具体支付结果
                 */

                if (!this.$_.isEmpty(rs.data.attributes.wechat_qrcode)) {
                    await this.$swal({
                        text: "打开微信，扫一扫",
                        buttons: {
                            cancel: "完成",
                        },
                        content: {
                            element: "img",
                            attributes: {
                                src: rs.data.attributes.wechat_qrcode,
                                class: 'wxpay_qrcode'
                            },
                        }
                    });

                    /**
                     * 用户点击完成，检查订单支付状态，返回支付结果回调
                     */
                    const paid = await this.checkOrderIsPaid(orderSN);
                    return paid;
                }

                /**
                 * 处理其他支付类型，拓展支付宝等
                 */
            }

            await this.$swal('无法支付，请检查账户状态或交易方式失效不存在');

            return false;
        },
        /**
         * 检查订单是否支付
         * 返回boolean
         */
        async checkOrderIsPaid(orderSN) {
            if (!orderSN) {
                return false;
            }

            const rs = await ordersAPI.check(orderSN);
            if (rs) {
                /**
                 * 返回订单支付状态
                 */
                return rs.data.attributes.status == 1 ? true : false;
            }

            return false;
        }
    }
}