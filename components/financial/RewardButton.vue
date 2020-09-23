<template>
	<div class="text-center mb-4 mt-4">
		<v-dialog v-model="rewardDialog" persistent max-width="500">
			<template v-slot:activator="{ on, attrs }">
				<v-btn :loading="loading" v-bind="attrs" v-on="on" depressed large dark color="red">
					<v-icon left>mdi-currency-usd</v-icon>打赏该主题
				</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline">支持作者继续创作</v-card-title>
				<v-card-text>为创作者打赏，打赏后无法撤回</v-card-text>
				<RewardDialogItems
					@continuTopay="openRewardDialog"
					@open="rewardDialog = true"
					@close="rewardDialog = false"
				></RewardDialogItems>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="rewardDialog = false">取消</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!--创建订单对话框组价-->
		<CreateOrderDialog
			@orderCreated="payOrder"
			:type="2"
			v-model="showOrder"
			:isAnonymous="false"
			:amount="$C.formatAmounts(amount)"
			:thread="thread"
		></CreateOrderDialog>
	</div>
</template>

<script>
import RewardDialogItems from "~/components/financial/RewardDialogItems";
import CreateOrderDialog from "~/components/financial/orders/CreateOrderDialog";
import PaymentMixin from "~/components/mixins/financial/Payment.mixin";

export default {
	mixins: [PaymentMixin],
	props: {
		/**
		 * 主题
		 */
		thread: Object,
	},
	data() {
		return {
			loading: false,
			rewardDialog: false,
			showOrder: false,
			amount: 0,
		};
	},
	methods: {
		/**
		 * 打开支付对话组件
		 */
		async openRewardDialog(amount) {
			this.rewardDialog = false;
			this.amount = amount;

			/** 打开支付询问对话框 */
			this.showOrder = true;
		},
		/**
		 * 请求支付订单
		 * payment 包含订单信息 和 支付方式
		 */
		async payOrder(payment) {
			this.loading = true;

			const result = await this.pay(payment.order, payment.method.type);

			this.loading = false;
			if (result) {
				/**
				 * 支付完成回调
				 */
				await this.$swal("打赏成功，谢谢");
				return;
			}

			this.$swal("未查询到成功支付状态，请在订单明细中查看或继续支付");
		},
	},
	components: {
		RewardDialogItems,
		CreateOrderDialog,
	},
};
</script>

<style>
</style>