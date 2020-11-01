const app = require('express')();
const { createProxyMiddleware } = require('http-proxy-middleware');
const discuzConfig = require('../discuz.config');
const isDev = !(process.env.NODE_ENV === 'production');

// Build only in dev mode
if (isDev) {
    /**
     * api proxy
     * 是否启用接口代理
    */
    if (discuzConfig.proxy.development) {
        app.all('*', createProxyMiddleware({ target: discuzConfig.proxy.development, changeOrigin: true }));
    }
} else {
    /**
     * 是否启用接口代理
     */
    if (discuzConfig.proxy.production) {
        app.all('*', createProxyMiddleware({ target: discuzConfig.proxy.production, changeOrigin: true }));
    }
}

module.exports = app