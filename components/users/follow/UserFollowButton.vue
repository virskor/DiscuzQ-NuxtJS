<template>
	<v-row no-gutters align="center" class="mr-2" justify="end">
		<v-btn
			:loading="loading"
			color="transparent"
			@click="toggleFollowButton"
			:ripple="false"
			depressed
		>
			<v-icon :color="isFollowed ? 'primary' : ''">mdi-account-plus</v-icon>
			<span :class="isFollowed ? 'primary--text' : ''">{{isFollowed ? '已关注': '关注TA'}}</span>
		</v-btn>
	</v-row>
</template>

<script>
import usersAPI from "~/api/users";

export default {
	props: {
		/**
		 * 用户模型
		 */
		user: Object,
	},
	data() {
		return {
			/**
			 * 本次是否关注，默认为Null
			 */
			followed: null,
			/**
			 * 处理中
			 */
			loading: false,
		};
	},
	computed: {
		/**
		 * 是否已经关注
		 */
		isFollowed() {
			const { user, followed } = this;
			if (followed !== null) {
				return followed;
			}
			return !user.attributes.follow ? false : true;
		},
	},
	methods: {
		/**
		 * 反选关注
		 */
		async toggleFollowButton() {
			const { followed } = this;
			return followed ? await this.unfollow() : await this.follow();
		},
		/**
		 * 关注
		 */
		async follow() {
			const { user } = this;
			this.loading = true;

			const rs = await usersAPI.follow(user.id);

			this.loading = false;

			if(rs){
				this.followed = true;
			}
		},
		/** 取消关注 */
		async unfollow() {
			const { user } = this;
			this.loading = true;

			const rs = await usersAPI.unfollow(user.id, 1);

			this.loading = false;

			if(rs){
				this.followed = false;
			}
		},
	},
};
</script>

<style>
</style>