
<script>
export default {
  data() {
    return {
      navigationItems: [
        { img: "/hot.png", size: 25, text: "时下最新", route: "/" },
        {
          img: "/categories.png",
          text: "版块分类",
          route: "/views/categories",
        },
        { img: "/chat.png",size: 31, text: "话题", route: "/views/topics" },
        {
          img: "/bell.png",
          text: "消息提醒",
          route: "/views/notices",
          notificationBadge: true,
        },
        {
          img: "/star.png",
          text: "我的收藏",
          route: "/views/collections",
        },
        {
          img: "/card.png",
          text: "卡包",
          route: "/views/wallet",
        },
        {
          img: "/account.png",
          text: "账户管理",
          route: "/users/profiles",
        },
        {
          img: "/settings.png",
          size: 31,
          text: "设置",
          route: "/views/settings",
        },
        {
          icon: "icon-tuichu2",
          text: "退出",
          color: "red",
          shouldLogin: true,
          callback: async () => {
            const result = await this.$swal({
              title: "退出登录吗",
              text: "您将退出登录，是否确定当前操作？",
              icon: "info",
              buttons: {
                cancel: "取消",
                catch: {
                  text: "确定",
                },
              },
              dangerMode: true,
            });

            if (result) {
              this.$store.dispatch("logout");
            }
          },
        },

        //{ text: "站点信息", route: "/views/siteinfo" },
        // { text: "更新日志", route: "/changelog" },
        // { text: "下载APP", route: "/app" },
      ],
    };
  },
};
</script>

<style>
</style>