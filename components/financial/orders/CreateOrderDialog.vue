<template>
	<v-dialog v-model="showCreateOrder" persistent max-width="500">
		<v-card>
			<v-card-title class="headline">支付 {{amount}} 元</v-card-title>
			<v-card-text>选择结算方式后，即可完成结算。您可以根据使用偏好来继续</v-card-text>
			<v-list class="pa-3">
				<v-list-item @click="method = p" v-for="(p, i) in paymentMethods" :key="i">
					<v-list-item-avatar>
						<i :class="`iconfont ${p.icon} icon-medium primary--text`"></i>
					</v-list-item-avatar>
					<v-list-item-title>{{p.name}}</v-list-item-title>
					<v-list-item-action v-if="method == p">
						<v-icon color="primary">mdi-checkbox-marked-circle</v-icon>
					</v-list-item-action>
				</v-list-item>
			</v-list>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn :disabled="creating" text @click="close">取消</v-btn>
				<v-btn :loading="creating" dark depressed color="primary" @click="create">确认支付</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import ordersAPI from "~/api/orders";

export default {
	props: {
		/**
		 * 要创建的订单类型
		 * 1：注册，2：打赏，3：付费主题，4：付费用户组
		 */
		type: Number,
		/**
		 * 打赏，付费主题时，传入主题
		 */
		thread: Object,
		/**
		 * 购买用户组时，需要传入要购买的用户组
		 */
		group: Object,
		/**
		 * 订单金额
		 */
		amount: String,
		/**
		 * 是否为匿名
		 * 是否匿名，默认不匿名。匿名订单不在前台展示
		 */
		isAnonymous: Boolean,
		/**
		 * value
		 * 是否显示
		 */
		value: Boolean,
	},
	data() {
		return {
			/**
			 * 是否显示对话框
			 */
			showCreateOrder: false,
			/**
			 * 预设的支付方式
			 */
			paymentMethods: [
				{
					name: "微信扫码支付",
					type: 10,
					icon: "icon-wechat-pay-fill",
				},
				// { name: "钱包支付", type: 20, icon: 'icon-qianbao' },
			],
			/**
			 * 是否正在创建订单
			 */
			creating: false,
			/**
			 * 用户选定的支付方式
			 */
			method: null,
		};
	},
	mounted(){
		this.$nextTick(()=>{
			/**
			 * 默认选中
			 */
			
			const {paymentMethods} = this;
			this.method = paymentMethods[0];
		});
	},
	methods: {
		/**
		 * 关闭并停止创建订单
		 */
		close() {
			this.showCreateOrder = false;
			this.creating = false;
			this.$emit("input", false);
		},
		/**
		 * create Order
		 */
		async create() {
			const { type, thread, group, amount, isAnonymous, method } = this;
			if (!method) {
				await this.$swal("请选择支付方式");
				return;
			}

			this.creating = true;

			let data = {
				type,
				amount,
				is_anonymous: isAnonymous ? 1 : 0,
			};

			if (!this.$_.isEmpty(thread)) {
				data["thread_id"] = thread.id;
			}

			if (!this.$_.isEmpty(group)) {
				data["group_id"] = group.id;
			}

			const rs = await ordersAPI.create(data);

			this.creating = false;

			if (rs) {
				this.close();
				this.$emit("orderCreated", {
					order: rs.data,
					method,
				});
			}
		},
	},
	watch: {
		value(val) {
			this.showCreateOrder = val;
		},
	},
};
</script>

<style>
</style>