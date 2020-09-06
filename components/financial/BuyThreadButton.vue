<template>
	<div v-if="shouldPay" class="text-center mb-4 mt-4">
		<v-dialog v-model="dialog" persistent max-width="500">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					:loading="loading"
					v-bind="attrs"
					v-on="on"
					depressed
					rounded
					large
					dark
					color="amber"
				>支付¥{{$C.formatAmounts(thread.attributes.price)}}购买</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline">支付¥{{$C.formatAmounts(thread.attributes.price)}}</v-card-title>
				<v-card-text>您将付费购买该主题</v-card-text>
				<div class="pl-5">
                    <v-checkbox v-model="isNotAnonymous" label="支付记录显示我的头像"></v-checkbox>
                </div>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="dialog = false">取消</v-btn>
					<v-btn color="amber" rounded depressed dark @click="openRewardDialog">继续支付</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!--创建订单对话框组价-->
		<CreateOrderDialog
			@orderCreated="payOrder"
			:type="3"
			v-model="showOrder"
			:amount="$C.formatAmounts(amount)"
			:isAnonymous="!isNotAnonymous"
			:thread="thread"
		></CreateOrderDialog>
	</div>
</template>

<script>
import PaymentMixin from "~/components/mixins/financial/Payment.mixin";
import CreateOrderDialog from "~/components/financial/orders/CreateOrderDialog";

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
			dialog: false,
			loading: false,
			showOrder: false,
			isNotAnonymous: true,
			amount: 0,
		};
	},
	computed: {
		shouldPay() {
			const { thread } = this;
			return thread.attributes.price != "0.00" && !thread.attributes.paid;
		},
	},
	methods: {
		/**
		 * 打开支付对话组件
		 */
		async openRewardDialog() {
			const { thread } = this;

			this.dialog = false;
			this.amount = thread.attributes.price;

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
				await this.$swal("购买成功，将刷新页面来查看");
				window.location.reload();
				return;
			}

			this.$swal("未查询到成功支付状态，请在订单明细中查看或继续支付");
		},
	},
	components: {
		CreateOrderDialog,
	},
};
</script>

<style>
</style>