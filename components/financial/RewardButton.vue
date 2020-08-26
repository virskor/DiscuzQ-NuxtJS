<template>
	<div class="text-center mb-4 mt-4">
		<v-dialog v-model="rewardDialog" persistent max-width="500">
			<template v-slot:activator="{ on, attrs }">
				<v-btn :loading="loading" v-bind="attrs" v-on="on" depressed rounded large dark color="red">
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
			:amount="$C.formatAmounts(amount)"
			:thread="thread"
		></CreateOrderDialog>

		
	</div>
</template>

<script>
import RewardDialogItems from "~/components/financial/RewardDialogItems";
import CreateOrderDialog from "~/components/financial/CreateOrderDialog";

export default {
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

			console.log(payment);

			setTimeout(() => {
				this.loading = false;
			}, 3000);

			this.$swal("已经创建订单，但暂时无法唤起支付，请稍等后续功能完善");
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