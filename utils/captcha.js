export default class Captcha {
    constructor(options) {
        this.o = {
            appId: options.appId
        }
        this.captcha = null
        if (!this.o.appId) {
            throw new Error('请填写appId')
        }
    }
    /**
     * 弹出腾讯云验证码
     * 
     * @param {*} options 
     */
    showCaptcha(options) {
        let id = (new Date()).getTime()
        return new Promise((resolve, reject) => {
            this.captcha = new window.TencentCaptcha(this.o.appId, function (res) {
                if (res.ret > 0) {
                    // 用户自行关闭
                    if (options && options.error && typeof options.success === 'function') {
                        const err = {
                            message: '用户自行关闭'
                        }
                        options.error(err)
                    } else {
                        let err = new Error('用户自行关闭')
                        err.res = res
                        reject(err)
                    }
                } else {
                    if (options && options.success && typeof options.success === 'function') {
                        options.success(res)
                    }
                    resolve(res)
                }
            }, { bizState: id })
            this.captcha.show()
        })
    }

    /**
     * 关闭腾讯云验证码
     */
    closeCaptcha() {
        return new Promise((resolve, reject) => {
            if (this.captcha) {
                this.captcha.destroy()
                resolve()
            } else {
                let err = new Error('没有实例')
                reject(err)
            }
        })
    }

    /**
     * 取得票据
     */
    getTicket() {
        return new Promise((resolve, reject) => {
            if (this.captcha) {
                let res = this.captcha.getTicket()
                resolve(res)
            } else {
                let err = new Error('没有实例')
                reject(err)
            }
        })
    }
}