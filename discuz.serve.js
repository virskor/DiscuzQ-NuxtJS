const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const discuzConfig = require('./discuz.config');

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

const start = () => {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);
    const { host, port } = nuxt.options.server;

    const runNuxt = async (app) => {
        // Build only in dev mode
        if (config.dev) {
             /**
              * api proxy
              * 是否启用接口代理
             */
            if (discuzConfig.proxy.development) {
                app.use('/api', createProxyMiddleware({ target: discuzConfig.proxy.development, changeOrigin: true }));
            }

            const builder = new Builder(nuxt);
            await builder.build();
        } else {
            /**
             * 是否启用接口代理
             */
            if (discuzConfig.proxy.production) {
                app.use('/api', createProxyMiddleware({ target: discuzConfig.proxy.production, changeOrigin: true }));
            }
            
            await nuxt.ready();
        }

        // Give nuxt middleware to express
        app.use(nuxt.render);
    }

    runNuxt(app);

    // Listen the server
    app.listen(port, host);
    
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    });
}

start();