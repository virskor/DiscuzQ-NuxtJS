import _ from 'lodash';


const errors = {
    "unknown_error": "未知错误(公共错误名)",
    "category_not_found": "分类未找到",
    "censor_not_passed": "检查未通过",
    "sms_interval": "短信间隔错误",
    "model_not_found": "模型未找到",
    "route_not_found": "路由未找到",
    "no_bind_user": "未绑定用户",
    "sms_verify_error": "短信验证错误",
    "thread_count_fail": "主题数操作错误",
    "thread_behavior_fail": "主题状态异常",
    "thread_action_fail": "主题操作异常",
    "update_permission_error": "无权限更新",
    "upload_error": "上传图片失败",
    "file_not_allow": "无权访问文件",
    "scale_sum_not_10": "分成比例相加必须为 10",
    "cannot_delete_category_with_threads": "无法删除存在主题的分类",
    "user_update_error": "修改信息失败",
    "reply_content_cannot_null": "回复内容不能为空",
    "uninitialized_pay_password": "未初始化支付密码",
    "upload_time_not_up": "一天仅允许修改一次头像",
    "wallet_error": "钱包错误", //// todo: 未定义错误详细描述
    "validation_error": "表单验证错误",
    "permission_denied": "没有权限",
    "ban_user": "您的账号被禁用，无法访问本站点",
    "register_validate": "帐号审核中，请审核通过后尝试",
    "not_authenticated": "未登录",
    "file_type_not_allow": "文件类型不允许",
    "file_size_not_allow": "文件大小不允许",
    "content_banned": "内容被封禁",
    "login_failed": "帐号或密码错误",
    "login_failures_times_toplimit": "密码错误次数达到5次，请15分钟后再次尝试",
    "trade_error": "交易错误",
    "order_post_not_found": "订单错误",
    "order_type_error": "订单错误",
    "order_create_failure": "订单错误",
    "order_amount_error": "提现错误",
    "operate_type_error": "钱包错误",
    "wallet_status_error": "钱包错误",
    "operate_forbidden": "提现审核错误",
    "available_amount_error": "提现错误",
    "cash_interval_time": "提现错误",
    "cash_sum_limit": "提现错误",
    "status_cash_freeze": "提现错误",
    "mobile_is_already_bind": "手机号码已存在",
    "post_not_comment": "不能回复，回复回帖的内容",
    "post_not_fond": "未查询到该条回复",
    "setting_fill_register_reason": "注册时的注册原因必须必填",
};

/**
 * 获取错误提示信息
 * @param {*} key errors[code]
 * @param {*} err 接口返回原始的错误数据
 */
const mapError = function (key, err) {
    /**
     * err 是指接口返回的数据
     * 以下将会从错误的语言包匹配数据，而不直接用接口返回的错误提示
     * err为空
     * err detail无数据
     */

    if (_.isEmpty(err) || _.isEmpty(err[0]) || _.isEmpty(err[0]['detail'])) {
        return errors[key] || '未知错误';
    }

    return err[0]['detail'].map((it) => it).join('\r\n');
}

export default mapError;