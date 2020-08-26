<template>
	<v-list v-if="user" subheader>
		<v-list-item>
			<v-list-item-avatar :size="50">
				<Avatar :user="user"></Avatar>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title class="font-weight-black" v-text="user.attributes.username"></v-list-item-title>
				<v-list-item-subtitle>发布于：{{$C.formatDateTime(firstPost.attributes.createdAt)}}</v-list-item-subtitle>
			</v-list-item-content>

			<v-list-item-action>
				<v-chip label dark v-if="isSticky" class="mb-1" color="primary" small>置顶</v-chip>
				<v-chip label dark v-if="isEssence" class="mb-1" color="pink" small>精华</v-chip>
				<v-chip label dark v-if="shouldPay" color="amber" small>付费</v-chip>
			</v-list-item-action>
		</v-list-item>
	</v-list>
</template>

<script>
import Avatar from "~/components/users/Avatar";

export default {
	props: {
		/**
		 * 当前主题发布的用户
		 */
		user: Object,
		/**
		 * 当前主题的firstPost
		 */
		firstPost: Object,
		/**
		 * 是否显示顶置图标
		 */
		isSticky: Boolean,
		/**
		 * 是否显示精华
		 */
		isEssence: Boolean,
		/**
		 * shouldPay
		 */
		shouldPay: Boolean
	},
	components: {
		Avatar,
	},
};
</script>

<style>
</style>