<template>
	<div>
		<v-list-item>
			<v-list-item-avatar tile :size="50">
				<Avatar :user="user"></Avatar>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title>
					{{user.attributes.username}}
					<span
						v-if="$_.isEmpty(group)"
						class="v-list-item__subtitle"
					>({{group.attributes.name}})</span>
				</v-list-item-title>
				<v-list-item-subtitle>
					<span v-if="!$_.isEmpty(user.attributes.signature)">({{user.attributes.signature}})</span>
				</v-list-item-subtitle>
			</v-list-item-content>

			<v-list-item-action>
				<!--关注按钮-->
				<UserFollowButton v-if="showFollowButton" :user="user"></UserFollowButton>
				<v-btn v-if="!showFollowButton" text rounded color="primary" @click="visit(user)" small>查看Ta</v-btn>
			</v-list-item-action>
		</v-list-item>
	</div>
</template>

<script>
import Avatar from "~/components/users/Avatar";
import UserFollowButton from "~/components/users/follow/UserFollowButton";

export default {
	props: {
		/**
		 * 用户模型
		 */
		user: Object,
		/**
		 * 用户组
		 */
		group: Object,
		/**
		 * showFollowButton
		 */
		showFollowButton: Boolean,
	},
	components: {
		Avatar,
		UserFollowButton,
	},
	methods: {
		/**
		 * visit
		 * 查看用户主页
		 */
		visit(user) {
			const id = user.id || 0;
			this.$router.push({ path: `/users/${id}` });
		},
	},
};
</script>

<style>
</style>