<template>
  <div class="discuz">
    <v-app>
      <!--底部菜单，仅手机显示-->
      <BottomNavigation
        @start="() => (showStartDrawer = true)"
      ></BottomNavigation>
      
      <v-app-bar
        :color="appbarColor || 'white'"
        clipped-right
        clipped-left
        flat
        app
      ></v-app-bar>

      <!-- <v-dialog :value="true" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            下载App来继续
          </v-card-title>

          <v-card-text class="mt-4">
            正如我们的标题所述，我们将推荐您使用测试版本的App来继续。现在您可能继续浏览我们的站点，但您可以使用APP来继续(正在开发中的版本)
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="download"> 前往下载 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->

      <!--路由渲染-->
      <v-main app>
        <template v-if="(!forum && !loadForumFailed) || loadingUser">
          <!--加载中-->
          <v-dialog
            :value="(!forum && !loadForumFailed) || loadingUser"
            hide-overlay
            persistent
            width="300"
          >
            <v-card color="primary" dark>
              <v-card-text>
                请稍等
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>

        <!--加载forum对象失败-->
        <template v-if="!forum && loadForumFailed">
          <v-sheet class="px-3 pt-3 pb-12">
            <center class="text-h6">
              <span>网络不稳定导致加载失败，请重试</span>
            </center>
          </v-sheet>
        </template>

        <!--经典模式下，不显示-->
        <StartDrawer v-model="showStartDrawer"></StartDrawer>
        <EndDrawer v-model="showEndDrawer"></EndDrawer>

        <!--路由-->
        <nuxt
          :class="nuxtBackground"
          v-if="forum && !loadForumFailed && !loadingUser"
        >
        </nuxt>

        <!--返回顶部按钮-->
        <client-only>
          <go-top id="goTop" :duration="1000">
            <v-btn class="gotop elevation-5" color="primary" fab>
              <v-icon large dark>mdi-chevron-up</v-icon>
            </v-btn>
          </go-top>
        </client-only>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import StartDrawer from "~/components/navigationDrawers/StartDrawer";
import EndDrawer from "~/components/navigationDrawers/EndDrawer";
import BottomNavigation from "~/components/common/BottomNavigation";
import DefaultMixins from "~/layouts/default.mixins";

export default {
  mixins: [DefaultMixins],
  data() {
    return {
      loadForumFailed: false,
      showStartDrawer: false,
      showEndDrawer: false,
      //showbackIcon: false,
      /**
       * loadingUser 结束后，路由才会进行渲染
       */
      loadingUser: true,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      /**
       * mixin method bootstrap
       * bootstrap 将启动应用配置
       *
       */
      await this.bootstrap();

      this.loadForumFailed = !(await this.$store.dispatch("getForum"));

      /**
       * 如果用户刷新页面，防止登录状态丢失
       * 尝试恢复从本地的登录记录中登录的当前用户
       */
      await this.$store.dispatch("getCurrentUser", {
        fromLocal: true,
      });
      /// getCurrentUser 之后才能将 loadingUser 改变
      /// 否则将会导致用户刷新页面，错误跳转到登录页面
      this.loadingUser = false;
    });
  },
  computed: {
    ...mapGetters({
      appConf: types.GETTERS_APPCONF,
      forum: types.GETTERS_FORUM,
    }),
    appbarColor() {
      const { appConf, color } = this;
      if (color) {
        return color;
      }

      if (appConf.appbarColor) {
        return appConf.appbarColor;
      }

      if (appConf.dark && !appConf.appbarColor) {
        return "grey darken-4";
      }

      return "white";
    },
    /**
     * router background
     */
    nuxtBackground() {
      const { appConf } = this;

      if (appConf.dark) {
        return "black";
      }

      return "app-global-theme fill-height";
    },
    siteClosed() {
      const { forum } = this;
      return forum == null ? false : forum.attributes.set_site.site_close;
    },
  },
  methods: {
    toggleDrawers() {
      this.showStartDrawer = !this.showStartDrawer;
    },
    download() {
      window.location.href = "https://app.clodra.com";
    },
  },
  watch: {
    // "$route": function(){
    // 	this.showbackIcon = this.$route.path != '/';
    // }
  },
  components: {
    StartDrawer,
    BottomNavigation,
    EndDrawer,
  },
};
</script>

<style lang="less">
.discuz {
  .v-app-bar.v-toolbar.v-sheet {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
    //box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.02), 0px 4px 5px 0px rgba(0, 0, 0, 0.04), 0px 1px 10px 0px rgba(0, 0, 0, 0.22) !important;
  }
}
</style>
