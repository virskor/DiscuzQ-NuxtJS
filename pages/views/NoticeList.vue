<template>
	<div>
		<AppTitle :title="title"></AppTitle>

		<v-container v-if="loading && pageNumber == 1">
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
		</v-container>
		
		<!--渲染消息列表-->
		<v-container v-if="!$_.isEmpty(notifications)">
			<template v-for="(n, i) in notifications">
				<NotificationItemCard :notification="n" :type="type"  :key="i"></NotificationItemCard>
			</template>
			
			<MorePage
				caption="加载更多"
				:loading="loading"
				@input="getNotifications"
				:length="meta ? meta.pageCount : 1"
				v-model="pageNumber"
			></MorePage>
		</v-container>

		<template v-else>
			<EmptyBox v-if="!loading"></EmptyBox>
		</template>
	</div>
</template>

<script>
import notificationAPI from "~/api/notification";
import NotificationItemCard from "~/components/message/NotificationItemCard";

export default {
	data() {
		return {
			/**
			 * 消息列表
			 */
			title: this.$route.query.title || "消息列表",
			/**
			 * 类型
			 */
			type: this.$route.query.type || "",
			/**
			 * 页码
			 */
			pageNumber: 1,
			/**
			 * 通知数据
			 */
			notificationData: null,
			/**
			 * 分页数据
			 */
			meta: null,
			/**
			 * 加载中
			 */
			loading: false
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
			await this.getNotifications();
		});
	},
	computed:{
		/**
		 * 评论
		 */
		notifications() {
			const { notificationData } = this;
			return !notificationData ? [] : notificationData.data;
		},
	},
	methods: {
		/**
		 * 获取消息通知列表
		 */
		async getNotifications() {
			const { type, pageNumber, notificationData } = this;
			
			this.loading = true;

			const rs = await notificationAPI.getNotifications({
				"filter[type]": type,
				"page[number]": pageNumber,
			});

			this.loading = false;

			if (rs) {
				this.meta = rs.meta;
				if (!notificationData) {
					this.notificationData = rs;
					return;
				}

				this.notificationData = {
					data: [...notificationData.data, ...rs.data],
				};
			}
		},
	},
	components: {
		NotificationItemCard,
	},
};
</script>

<style>
</style>