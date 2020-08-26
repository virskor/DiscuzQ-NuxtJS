<template>
	<div>
		<AppTitle title="更新日志">
			<v-btn @click="openGithub" color="primary" text>GITHUB</v-btn>
		</AppTitle>
		<v-container fluid>
			<v-card tile flat>
				<v-card-title>最新上传的代码</v-card-title>
				<v-card-subtitle>我们为您列出最近上传的代码中包含的更新。仅为您提供参考，这是第三方的PC DESKTOP版本，暂时无法用于生产。您可以再Github上关注，以便第一时间知道是否可用于生产 {{githubUrl}}</v-card-subtitle>
			</v-card>
			<v-card tile flat class="pl-4">
				<p>计划近期完成的：编辑器</p>
				<p>计划近期完成的：帖子管理，删除，编辑，回复，发帖等</p>
				<p>计划近期完成的：消息提醒</p>
				<p>计划近期完成的：私信</p>
				<p>计划近期完成的：微信支付</p>
				<p>计划近期完成的：订单，提现，流水，打赏等</p>
				<p>计划近期完成的：偏好设置</p>
			</v-card>
			<v-list>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-26</p>
						<p>新增话题详情</p>
						<p>增加用户的关注，粉丝列表</p>
						<p>增加我的收藏主题列表</p>
						<p>增加用户点赞的帖子展示</p>
						<p>新增打赏用户显示组件</p>
						<p>新增订单明细</p>
						<p>新增打赏询问组件</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-25</p>
						<p>用户关注按钮组件</p>
						<p>加载更多评论</p>
						<p>搜索帖子</p>
						<p>增加搜索用户</p>
					</v-card>
				</v-list-item>
				<v-list-item>
					<v-card flat tile>
						<p class="text-h5">2020-08-24</p>
						<p>点赞帖子</p>
						<p>用户主页的部分功能</p>
						<p>腾讯云CDN快速刷新命令</p>
					</v-card>
				</v-list-item>
			</v-list>
		</v-container>
	</div>
</template>

<script>
export default {
	head() {
		return {
			title: "更新日志",
		};
	},
	data() {
		return {
			githubUrl: "https://github.com/virskor/DiscuzQ-NuxtJS",
		};
	},
	methods: {
		openGithub() {
			const { githubUrl } = this;

			let win = window.open();
			win.location.href = githubUrl;
		},
	},
};
</script>
