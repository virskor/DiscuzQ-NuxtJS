import axios from 'axios';
import _ from 'lodash';
import RequestIncludes from '~/api/requests/requestIncludes';
import Authorization from '~/utils/authorization';
import mapRequestErrors from '~/api/requests/requestErrors';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import URLS from '~/api/requests/URLS';

/**
 * axios 实例
 */
const instance = axios.create();
/**
 * 接口请求超时时间设置
 */
const timeout = 1000 * 60;


instance.defaults.withCredentials = true;

/**
 * 跳转到登录前的页面
 */
const redirectToLogin = async () => {
    if (typeof swal === "function") {
        const result = await swal({
            title: "登录来继续",
            text: "您还没有登录，现在前往登录后即可继续用操作",
            icon: "info",
            buttons: {
                cancel: "取消",
                catch: {
                    text: "前去登录!",
                },
            },
            dangerMode: true,
        });

        if (result) {
            const callback = encodeURI(window.location.href);
            window.location.href = `/users/login?callback=${callback}`;
        }
    }
}

const refreshAuthLogic = async failedRequest => {
    /**
     * 从客户端取得refresh_token
     */
    const getAccessToken = new Authorization().getAccessToken();
    if (_.isEmpty(getAccessToken)) {
        return;
    }

    /**
     * todo: 尝试刷新accesstoken
     */
    const data = {
        attributes: {
            grant_type: "refresh_token",
            refresh_token: getAccessToken.attributes.refresh_token
        }
    };

    try {
        const rs = await axios.post(URLS.REFRESH_TOKEN, { data });
        if (rs) {
            new Authorization().setAccessToken(rs.data);
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + rs.data.attributes.access_token;
            return Promise.resolve();
        }
    } catch (e) {
        new Authorization().clear();
        redirectToLogin();
    }


    return;
}

/**
 * request interceptor
 */

instance.interceptors.request.use(
    async config => {
        config.headers = { "Content-Type": "application/vnd.api+json", };

        /**
                 * 补全header
                 * 
                 * 主要的是补全 authorization
                 */
        const getAccessToken = new Authorization().getAccessToken();
        if (!_.isEmpty(getAccessToken)) {
            config.headers = {
                'Authorization': `Bearer ${getAccessToken.attributes.access_token}`,
                "Content-Type": "application/vnd.api+json",
            }
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

/**
 * token刷新
 */
createAuthRefreshInterceptor(instance, refreshAuthLogic);

/**
 * 防止请求重复发送
 */
let requestFilter = {
    requests: [],
    push(opts) {
        let req = {
            time: new Date(),
            key: opts,
            opts,
        }
        this.requests.push(req);
    },
    pop(opts) {
        let index = this.requests.findIndex(it => it.key == opts);
        if (index >= 0) {
            this.requests.splice(index, 1);
        }
    },
    hasPending(opts) {
        return this.requests.findIndex(it => it.key == opts) >= 0;
    }
};


export default {
    /**
     * GET 请求
     * @param {*} opts 
     */
    get(opts) {
        if (requestFilter.hasPending(opts)) {
            console.log('repeating ajax url:', opts.url);
            return;
        }
        requestFilter.push(opts);

        /**
         * 补全 request includes
         * 
         */
        try {
            if (opts.includes) {
                opts.data = {
                    ...opts.data,
                    "include": RequestIncludes.toRequestQueries(opts.includes)
                }
            }
        } catch (e) {
            /**
             * 如果toRequestQueries 发生错误，那么将会抛出异常且请求不在继续
             * 注意提示用户(通常这种情况为提示开发人员，所以此处直接在console发出警告即可)
             */
            console.error(`ERROR OCCURD WHEN FORMAT INCLUDES: ${e}`);
            return;
        }

        return instance.get(opts.url, {
            /**
             * 补全queries
             */
            params: opts.data || opts.params || {},
            timeout
        }).then((res) => {
            requestFilter.pop(opts);
            return res.data;
        }, (err) => {
            requestFilter.pop(opts);

            /** 401不要处理，在interceptor处理 */
            if (err.response.status == 401) {
                return;
            }

            if (err.response.data) {
                this.showError(err.response.data.errors[0].code, err.response.data.errors);
            }

            if (opts.failed) {
                return opts.failed(err);
            }

        }).catch(_ => {
            requestFilter.pop(opts);
        });
    },


    /**
     * POST 请求
     * POST 默认发送json object数据
     */
    post(opts) {
        const opt = this.resetOpts(opts);

        return instance.post(
            opt.url,
            opt.data,
            { timeout },

        ).then((res) => {
            requestFilter.pop(opt);
            return res.data;
        }, (err) => {
            requestFilter.pop(opt);

            /** 401不要处理，在interceptor处理 */
            if (err.response.status == 401) {
                return;
            }


            if (opt.failed) {
                return opt.failed(err);
            }

            if (err.response.data) {
                this.showError(err.response.data.errors[0].code, err.response.data.errors);
            }
        }).catch(_ => {
            requestFilter.pop(opt);
        });
    },

    /**
     * Upload 上传文件
     * @param {*} opts 
     */
    upload(opts) {
        const opt = this.resetOpts(opts);

        return instance.post(
            opt.url,
            opt.formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout,
            }

        ).then((res) => {
            requestFilter.pop(opt);
            return res.data;
        }, (err) => {
            requestFilter.pop(opt);

            /** 401不要处理，在interceptor处理 */
            if (err.response.status == 401) {
                return;
            }


            if (opt.failed) {
                return opt.failed(err);
            }

            if (err.response.data) {
                this.showError(err.response.data.errors[0].code, err.response.data.errors);
            }
        }).catch(_ => {
            requestFilter.pop(opt);
        });
    },


    /**
    * DELETE 请求
    * DELETE 默认发送json object数据
    */
    delete(opts) {
        const opt = this.resetOpts(opts);

        return instance.delete(
            opt.url,
            opt.data,
            { timeout },

        ).then((res) => {
            requestFilter.pop(opt);
            return res;
        }, (err) => {
            requestFilter.pop(opt);

            /** 401不要处理，在interceptor处理 */
            if (err.response.status == 401) {
                return;
            }

            if (opt.failed) {
                return opt.failed(err);
            }

            if (err.response.data) {
                this.showError(err.response.data.errors[0].code, err.response.data.errors);
            }
        }).catch(_ => {
            requestFilter.pop(opt);
        });
    },


    /**
     * PATCH 请求
     * PATCH 默认发送json object数据
     */
    patch(opts) {
        const opt = this.resetOpts(opts);

        return instance.patch(
            opt.url,
            opt.data,
            { timeout },

        ).then((res) => {
            requestFilter.pop(opt);
            return res.data;
        }, (err) => {
            requestFilter.pop(opt);

            /** 401不要处理，在interceptor处理 */
            if (err.response.status == 401) {
                return;
            }

            if (opt.failed) {
                return opt.failed(err);
            }

            if (err.response.data) {
                this.showError(err.response.data.errors[0].code, err.response.data.errors);
            }
        }).catch(_ => {
            requestFilter.pop(opt);
        });
    },

    /**
     * 返回一个opt 对象，用于post patch
     */
    resetOpts(opts) {

        if (requestFilter.hasPending(opts)) {
            console.log('repeating ajax url:', opts.url);
            return;
        }
        requestFilter.push(opts);

        /**
         * 补全 request includes
         * 
         */
        try {
            if (opts.includes) {
                opts.url = `${opts.url}?include=${RequestIncludes.toRequestQueries(opts.includes)}`;
            }
        } catch (e) {
            /**
             * 如果toRequestQueries 发生错误，那么将会抛出异常且请求不在继续
             * 注意提示用户(通常这种情况为提示开发人员，所以此处直接在console发出警告即可)
             */
            console.error(`ERROR OCCURD WHEN FORMAT INCLUDES: ${e}`);
            return;
        }

        opts.data = {
            /**
             * 补全data
             * 提交的数据将被转入data.attributes
             */
            data: _.isEmpty(opts.data) ? {} : opts.data.attributes ? opts.data : {
                attributes: {
                    ...opts.data
                }
            },

        };

        return opts;

    },

    /**
     * 处理错误信息提示
     * 
     * 仅用于处理错误信息弹窗
     */
    showError(key, err) {
        const message = mapRequestErrors(key, err);

        /// toast message
        if (typeof swal === "function") {
            swal("操作失败", message, "error");
            return;
        }

        console.error('axios logger：', message);
    }


};