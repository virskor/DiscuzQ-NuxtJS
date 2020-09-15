
<script>
export default {
	data() {
		const {typeUnreadNotifications} = this;
		return {
			navigationItems: [
				{ icon: "icon-home", text: "首页", route: "/" },
				{
					icon: "icon-leimupinleifenleileibie1",
					text: "版块分类",
					route: "/views/categories",
				},
				{ divider: true },
				{ icon: "icon-huati", text: "话题", route: "/views/topics" },
				{
					icon: "icon-tongzhi",
					text: "消息提醒",
					route: "/views/notices",
					notificationBadge: true,
				},
				{ divider: true },
				{
					icon: "icon-shoucang1",
					text: "我的收藏",
					route: "/views/collections",
				},
				{ divider: true },
				{
					icon: "icon-wodeqiabao",
					text: "卡包",
					route: "/views/wallet",
				},
				{ divider: true },
				{
					icon: "icon-gerenziliao2",
					text: "个人资料",
					route: "/users/profiles",
				},
				{
					icon: "icon-shezhi1",
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
				{ divider: true },
				{ text: "站点信息", route: "/views/siteinfo" },
				{ text: "更新日志", route: "/changelog" },
				// { text: "下载APP", route: "/app" },
			],
		};
	},
};
</script>

<style>
</style>