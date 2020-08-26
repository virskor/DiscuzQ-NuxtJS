import discuzConf from '~/discuz.config';


export default {
    mounted() {
        this.$nextTick(async () => {
            /**
			 * 获取分类
			 * 暂存
			 */
            await this.$store.dispatch("getCategories");

            if (!this.$C.isMobile()) {
                this.showStartDrawer = true;
                this.showEndDrawer = true;
            }

            //await this.$store.dispatch("getSiteInfo");

            /**
             * 抓取通知
             * 状态管理
             */

            /**
             * 是否启用了手机版自动跳转
             */
            if (this.$C.isMobile()) {
                const responsive = { ...discuzConf.responsive };
                if (!responsive.enableMobile && responsive.redirectDomain) {
                    const result = await this.$swal({
                        title: "前往手机版吗?",
                        text: "我们为您准备了手机版，您可以继续浏览或者点击确定跳转到手机版",
                        icon: "info",
                        buttons: {
                            cancel: "继续浏览",
                            catch: {
                                text: "前往手机版!",
                            },
                        },
                        dangerMode: true,
                    });

                    if (result) {
                        let win = window.open();
                        win.location.href = responsive.redirectDomain;
                    }
                }
            }


        });
    },
    methods: {
        /**
         * 
         */
        async bootstrap() {
            /**
             * 加载应用本地配置
             *
             */
            await this.$store.dispatch('bootstrapConfigs');

            /**
             * 要自动切换黑暗模式
             */
            this.$vuetify.theme.dark = this.appConf.dark;
        }
    }
}