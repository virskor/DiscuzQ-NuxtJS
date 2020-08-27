<template>
	<v-card flat tile>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title>
					<span class="font-weight-black">{{paymentTypeText}}</span>
					<span class="ml-2">{{relatedThreadTitle}}</span>
				</v-list-item-title>
				<v-list-item-subtitle>{{$C.formatDateTime(order.attributes.created_at)}}</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<span class="v-list-item__subtitle">{{paymentStatusText}}</span>
				<span class="font-weight-black teal--text">-¥{{order.attributes.amount}}</span>
			</v-list-item-action>
		</v-list-item>
		<v-card-actions>
			<v-btn
				@click="$router.push(`/threads/${thread.id}`)"
				text
				color="primary"
				v-if="!$_.isEmpty(thread)"
			>查看主题</v-btn>
		</v-card-actions>
		<v-divider class="ma-2"></v-divider>
	</v-card>
</template>

<script>
export default {
	props: {
		/**
		 * 关联的主题
		 */
		thread: Object,
		/**
		 * 首贴
		 */
		firstPost: Object,
		/**
		 * order
		 */
		order: Object,
	},
	computed: {
		/**
		 * 转化付款状态
		 */
		paymentStatusText() {
			const { order } = this;

			const status = [
				{ caption: "所有", value: null },
				{ caption: "等付款", value: 0 },
				{ caption: "已付款", value: 1 },
				{ caption: "取消订单", value: 2 },
				{ caption: "支付失败", value: 3 },
				{ caption: "订单过期", value: 4 },
			];

			return status.find((o) => o.value == order.attributes.status)
				.caption;
		},
		/**
		 * paymentTypeText
		 * 付款类型标签
		 * 1：注册，2：打赏，3：付费主题，4：付费用户组
		 */
		paymentTypeText() {
			const { order } = this;

			const types = [
				{ caption: "注册", value: 1 },
				{ caption: "打赏", value: 2 },
				{ caption: "付费主题", value: 3 },
				{ caption: "付费用户组", value: 4 },
			];

			return types.find((o) => o.value == order.attributes.type).caption;
		},
		/**
		 * 消费的主题
		 */
		relatedThreadTitle() {
			const { thread, firstPost } = this;
			if (thread.attributes.title) {
				return thread.attributes.title;
      }
      
      return firstPost.attributes.contentHtml;
		},
	},
	methods: {},
};
</script>

<style>
</style>