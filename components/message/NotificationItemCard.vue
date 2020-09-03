<template>
	<v-card v-if="!fakeDelete" tile flat>
		<v-list>
			<v-list-item>
				<v-list-item-avatar v-if="notification.attributes.user_avatar" :size="50" tile>
					<v-avatar>
						<v-img :alt="notification.attributes.user_name" :src="notification.attributes.user_avatar"></v-img>
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						<span class="font-weight-black">{{mapSenderName}}</span>
						<span class="v-list-item__subtitle">{{computeTypeName}}</span>
					</v-list-item-title>
					<v-list-item-subtitle>{{$C.formatDateTime(notification.attributes.created_at)}}</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-icon>mdi-chevron-right</v-icon>
				</v-list-item-action>
			</v-list-item>
		</v-list>
		<div class="pl-5 mb-4">
			<div
			class="clickable"
				@click="openRelatedThreadOrPost"
				v-html="notification.attributes.post_content || notification.attributes.content || '无通知内容'"
			></div>
		</div>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn depressed color="red" text @click="deleteNotification">删除</v-btn>
			<v-btn depressed color="primary" text @click="openRelatedThreadOrPost">查看回复</v-btn>
		</v-card-actions>
		<v-divider></v-divider>
	</v-card>
</template>

<script>
import notificationAPI from "~/api/notification";

export default {
	props: {
		/**
		 * 通知模型
		 */
		notification: Object,
		/**
		 * 类型
		 */
		type: String,
	},
	data() {
		return {
			/**
			 * 假删除
			 *
			 * 如果用户点击删除成功后，隐藏该条消息
			 */
			fakeDelete: false,
		};
	},
	computed: {
		computeTypeName() {
			const { type } = this;
			if (type == "replied") {
				return "回复了我";
			}

			if (type == "related") {
				return "@了我";
			}

			return "";
		},
		/**
		 * 发件人名称
		 */
		mapSenderName() {
			const { notification } = this;
			if (notification.attributes.user_name) {
				return notification.attributes.user_name;
			}

			if (notification.attributes.type == "system") {
				return "系统信息";
			}

			return "";
		},
	},
	methods: {
		/**
		 * 打开关联的主题或者评论，评论的优先级最高
		 */
		openRelatedThreadOrPost() {
			const { notification } = this;

			/**
			 * 如果有评论则先尝试打开评论
			 */
			if (notification.attributes.post_id) {
				this.$router.push({
					path: `/posts/${notification.attributes.reply_post_id || notification.attributes.post_id}`,
					query: { threadID: notification.attributes.thread_id },
				});
				return;
			}

			/**
			 * 尝试打开关联的主题
			 */
			if (notification.attributes.thread_id) {
				this.$router.push(
					`/threads/${notification.attributes.thread_id}`
				);
				return;
			}

			this.$swal("无关联的帖子");
		},
		/**
		 * 删除通知
		 */
		async deleteNotification() {
			const { notification } = this;

			const result = await this.$swal({
				title: "确定删除这条通知吗？",
				text: "删除后无法恢复",
				icon: "info",
				buttons: {
					cancel: "取消",
					catch: {
						text: "确定并删除",
					},
				},
				dangerMode: true,
			});

			if (result) {
				const rs = await notificationAPI.removeNotifications(
					notification.id
				);
				if (rs) {
					this.fakeDelete = true;
				}
			}
		},
	},
};
</script>

<style>
</style>