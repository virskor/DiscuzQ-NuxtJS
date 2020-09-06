const nodeExternals = require('webpack-node-externals')
const discuzConfigs = require('./discuz.config')

module.exports = {
  telemetry: true,
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + discuzConfigs.ssr_sitename,
    title: discuzConfigs.ssr_sitename || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: discuzConfigs.ssr_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-png', href: '/logo.png' },
      ...discuzConfigs.head.link
    ],
    script: [
      ...discuzConfigs.head.script
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#1976d2', width: 2 },
  /*
  ** Global CSS
  */
  css: [
    '~/styles/common.less',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    /**
     * lodash 需要ssr，因为ssr render vue templates会用到
     */
    { src: '~/plugins/lodash', ssr: true },
    { src: '~/plugins/common', ssr: true },
    { src: '~/plugins/components', ssr: true },
    /**
     * 下面的部分，仅供client 调用，所以没有必要ssr
     */
    { src: '~/plugins/polyfill', ssr: false },
    { src: '~/plugins/vueSwal', ssr: false },
    { src: '~/plugins/tcaptcha', ssr: false },
    { src: '~/plugins/gotop', ssr: false },
    { src: '~/plugins/photoswipe', ssr: false },
    { src: '~/plugins/mavon', ssr: false },
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    theme: discuzConfigs.theme
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    parallel: false,
    publicPath: '/dist/',
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      const urlLoader = config.module.rules.find(rule => rule.test.test('.ttf'))
      urlLoader.test = /\.(woff2?|eot|ttf|pdf|otf)(\?.*)?$/i

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            allowlist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
