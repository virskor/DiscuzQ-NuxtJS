<template>
	<div class="text-center mb-4 mt-4 rewardedUsers">
		<p>
			<span class="grey--text">共{{thread.attributes.rewardedCount}}人打赏</span>
		</p>
		<!--打赏用户的头像-->

		<v-card tile flat class="rewardedUsersList" v-if="!$_.isEmpty(rewardedUsers)">
			<Avatar class="ma-1" :size="30" v-for="(u, i) in rewardedUsersFiltered" :key="i" :user="u"></Avatar>
		</v-card>
	</div>
</template>

<script>
import Avatar from "~/components/users/Avatar";

export default {
	props: {
		/**
		 * 主题
		 */
		thread: Object,
		/**
		 * 打赏的用户数组
		 */
		rewardedUsers: Array,
	},
	computed: {
		/**
		 * 去除打赏用户中相同的用户记录
		 */
		rewardedUsersFiltered(){
			const {rewardedUsers} = this;
			let attr = new Map();
			return rewardedUsers.filter((r) => !attr.has(r) && attr.set(r, 1))
		}
	},
	components: {
		Avatar,
	},
};
</script>

<style lang="less">
.rewardedUsers {
	.rewardedUsersList {
		display: inline-block;
		overflow: hidden;
		.qui-avatar {
			float: left;
		}
	}
}
</style>