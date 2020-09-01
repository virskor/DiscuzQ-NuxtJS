<template>
	<v-list v-if="user" subheader>
		<v-list-item>
			<v-list-item-avatar tile :size="50">
				<Avatar :user="user"></Avatar>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title class="font-weight-black" v-text="user.attributes.username"></v-list-item-title>
				<v-list-item-subtitle>发布于：{{$C.formatDateTime(firstPost.attributes.createdAt)}}</v-list-item-subtitle>
			</v-list-item-content>

			<v-list-item-action>
				<!--关注按钮-->
				<UserFollowButton v-if="allowFollow" :user="user"></UserFollowButton>
			</v-list-item-action>
		</v-list-item>
	</v-list>
</template>

<script>
import Avatar from "~/components/users/Avatar";
import UserFollowButton from "~/components/users/follow/UserFollowButton";

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
		 * 显示关注按钮
		 */
		allowFollow: Boolean,
	},
	components: {
		Avatar,
	},
};
</script>

<style>
</style>