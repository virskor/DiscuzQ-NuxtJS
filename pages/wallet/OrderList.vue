<template>
	<div>
		<AppTitle title="订单明细">
			<OrderStatusFilter @input="getOrders(true)" @dateChanged="dateChanged" v-model="filter"></OrderStatusFilter>
		</AppTitle>
		<v-container>
			<!--渲染订单列表-->
			<div v-if="loading && pageNumber == 1">
				<template>
					<v-sheet class="px-3 pb-3">
						<v-skeleton-loader
							v-for="(_, i) in 20"
							:key="i"
							ref="skeleton"
							type="list-item-avatar-two-line, table-tfoot"
							class="mx-auto"
						></v-skeleton-loader>
					</v-sheet>
				</template>
			</div>
			<div v-else>
				<v-card tile flat>
					<v-card-title>共{{meta ? meta.total : 0}}个订单记录</v-card-title>
				</v-card>
				<!--订单列表-->
				<v-list v-if="!$_.isEmpty(ordersData)">
					<template v-for="(order, i) in orders">
						<var-box :thread="mapRelatedThread(order.relationships)" :key="i" v-slot="{ thread }">
							<OrderItem :order="order" :thread="thread" :key="i"></OrderItem>
						</var-box>
					</template>
				</v-list>

				<!--没有数据-->
				<EmptyBox :refresh="false" v-else-if="!loading"></EmptyBox>

				<!--分页组件-->
				<MorePage
					caption="加载更多"
					:loading="loading"
					@input="getOrders"
					v-if="ordersData"
					:length="meta ? meta.pageCount : 1"
					v-model="pageNumber"
				></MorePage>
			</div>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import OrderStatusFilter from "~/components/financial/orders/OrderStatusFilter";
import OrderItem from "~/components/financial/orders/OrderItem";
import ordersAPI from "~/api/orders";

export default {
	head() {
		return {
			title: "订单明细",
		};
	},
	data() {
		return {
			/**
			 * 筛选条件
			 */
			filter: null,
			/**
			 * 页面
			 * pageNumber
			 */
			pageNumber: 1,
			/**
			 * 是否正在加载
			 */
			loading: false,
			/**
			 * 分页数据
			 */
			meta: null,
			/**
			 * date range
			 */
			dateRange: null,
			/**
			 * ordersData
			 */
			ordersData: null,
		};
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		/**
		 * 订单记录
		 */
		orders() {
			const { ordersData } = this;
			return ordersData.data;
		},
		/**
		 * 主题
		 */
		threads() {
			const { ordersData } = this;
			return ordersData.included.filter((el) => el.type == "threads");
		},
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
			await this.getOrders();
		});
	},
	methods: {
		/**
		 * 获取订单列表数据
		 */
		async getOrders(clear) {
			/**
			 * 是否清除旧数据
			 */
			if (clear === true) {
				this.pageNumber = 1;
				this.ordersData = null;
			}

			const { filter, user, pageNumber, dateRange, ordersData } = this;

			let data = {
				"page[number]": pageNumber,
				"filter[user]": user.id,
			};

			if (filter) {
				data["filter[status]"] = filter;
			}

			/**
			 * 补全查询条件时间范围
			 */
			if (
				dateRange &&
				typeof dateRange == "object" &&
				dateRange.length >= 1
			) {
				if (dateRange[0]) {
					data["filter[start_time]"] = dateRange[0];
				}

				if (dateRange[1]) {
					data["filter[end_time]"] = dateRange[1];
				}
			}

			this.loading = true;

			const rs = await ordersAPI.getOrders(data);

			this.loading = false;

			if (rs) {
				this.meta = rs.meta;
				if (!ordersData) {
					this.ordersData = rs;
					return;
				}

				this.ordersData = {
					data: [...ordersData.data, ...rs.data],
					included: [...ordersData.included, ...rs.included],
				};
			}
		},
		/**
		 * 用户更新时间范围
		 */
		dateChanged(range) {
			this.dateRange = range;
		},
		/**
		 * mapRelatedThread
		 * 枚举主题
		 */
		mapRelatedThread(relationships) {
			const { threads } = this;
			return threads.find((t) => t.id == relationships.thread.data.id);
		},
	},
	components: {
		OrderStatusFilter,
	},
};
</script>
