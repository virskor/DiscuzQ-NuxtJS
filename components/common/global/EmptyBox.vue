<template>
	<div>
		<div class="text-center">
			<img width="150px" src="~/assets/empty.png" />
			<p class="text-h4 font-weight-black">{{title || '没有更多啦'}}</p>
			<p v-if="refresh">
				<v-btn depressed color="primary" rounded @click="wantRefresh">刷新试试</v-btn>
			</p>
			<p>
				<v-btn @click="$router.go(-1)" text color="primary">返回上一页</v-btn>
			</p>
		</div>
		<slot/>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * 是否支持刷新
		 */
		refresh: Boolean,
		/**
		 * 想要显示的标题
		 */
		title: String,
	},
	methods: {
		/**
		 * 用户请求刷新
		 */
		wantRefresh() {
			this.$emit("requestRefresh");
		},
	},
};
</script>

<style>
</style>