<template>
	<div>
		<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="300" offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on" depressed text small color="primary">
					<i class="iconfont icon-Filter"></i>
				</v-btn>
			</template>

			<v-card class="pa-2">
				<v-list>
					<v-subheader>订单状态</v-subheader>
					<v-list-item @click="selectedItem = s" v-for="(s, i) in statusList" :key="i">
						<v-list-item-title>{{s.caption}}</v-list-item-title>
						<v-list-item-action v-if="selectedItem == s">
							<v-icon color="primary">mdi-checkbox-marked-circle</v-icon>
						</v-list-item-action>
					</v-list-item>
				</v-list>
				<v-divider></v-divider>
				<v-list>
					<v-subheader>筛选时间</v-subheader>
					<v-dialog ref="dialog" v-model="datepicker" :return-value.sync="date" persistent width="290px">
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="date"
								label="筛选查询时间"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker range locale="zh-CN" v-model="date">
							<v-spacer></v-spacer>
							<v-btn text color="primary" @click="datepicker = false">取消</v-btn>
							<v-btn text color="primary" @click="ensureDateTime">确定</v-btn>
						</v-date-picker>
					</v-dialog>
				</v-list>
				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn depressed @click="menu = false">关闭</v-btn>
					<v-btn depressed @click="enSureUpdateFilter" color="primary">筛选并查询</v-btn>
				</v-card-actions>
			</v-card>
		</v-menu>
	</div>
</template>

<script>
export default {
	props: ["value"],
	mounted() {
		this.$nextTick(() => {
			const { value, statusList } = this;
			/**
			 * 处理默认选中项目
			 */
			this.selectedItem = statusList.find((s) => s.value == value);
		});
	},
	data() {
		return {
			/**
			 * 预设的订单状态
			 */
			statusList: [
				{ caption: "所有", value: null },
				{ caption: "等付款", value: 0 },
				{ caption: "已付款", value: 1 },
				{ caption: "取消订单", value: 2 },
				{ caption: "支付失败", value: 3 },
				{ caption: "订单过期", value: 4 },
			],
			/**
			 * 显示菜单
			 */
			menu: false,
			/**
			 * seleted item
			 */
			selectedItem: null,
			datepicker: false,
			date: null,
		};
	},
	methods: {
		/**
		 * 更新filter状态
		 */
		enSureUpdateFilter() {
			const { selectedItem } = this;
			if (!selectedItem) {
				this.$swal("未选择筛选条件");
				return;
			}
			this.menu = false;
			this.$emit("input", selectedItem.value);
		},
		/**
		 * 更新选中的时间范围
		 */
		ensureDateTime(){
			const {date} = this;
			this.$refs.dialog.save(date);
			this.$emit('dateChanged', date);
		}
	},
};
</script>

<style>
</style>