import numeral from 'numeral';
import moment from 'moment';

moment.suppressDeprecationWarnings = true;

export default {
    /**
     * 是否是开发模式
     * 当 运行 yarn dev时返回true
     * yarn serve时返回false
     */
    isDevelopement() {
        return process.env.NODE_ENV == 'development'
    },

    /**
     * 是否是手机号
     * return bool
     */
    isMobile() {
        return navigator.userAgent.match(/mobile/i)
    },

    /**
     * 格式化金融数字
     * @param {*} m 金额
     */
    formatAmounts(m) {
        return numeral(m).format('0.000')
    },

    /**
     * 是否为整形
     * @param {*} num 
     */
    isInt(num) {
        if (!isNaN(num)) {
            num = parseFloat(num, 10)
            return parseInt(num, 10) === num
        }
        return false
    },

    /**
     * 检测是否为浮点数据
     * @param {*} num 
     */
    isFloat(num) {
        return !isNaN(num) && num.toString().indexOf('.') >= 0
    },

    /**
     * 格式化时间，返回 年-月
     * @param {*} m 
     */
    formatMonth(m) {
        let time = moment(m).format('YYYY-MM')
        if (time == 'Invalid date') {
            return '-'
        }
        return time
    },

    /**
     * 格式化时间，返回年-月-日
     * @param {*} m 
     */
    formatDate(m) {
        let time = moment(m).format('YYYY-MM-DD')
        if (time == 'Invalid date') {
            return '-'
        }
        return time
    },

    /**
     * 格式化时间 返回年-月-日 24:分:秒
     * @param {*} m 
     */
    formatDateTime(m) {
        let time = moment(m).format('YYYY-MM-DD HH:mm')
        if (time == 'Invalid date') {
            return '-'
        }
        return time
    },
}
