<template>
	<v-row no-gutters align="center" class="mr-2" justify="end">
		<v-btn
			:loading="loading"
			color="transparent"
			@click="toggleFollowButton"
			:ripple="false"
			depressed
		>
			<v-icon left :color="isFollowed ? 'primary' : ''">mdi-account-plus</v-icon>
			<span :class="isFollowed ? 'primary--text' : ''">{{followStatusSpan}}</span>
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
			/**
			 * 是否是双向
			 */
			isMutual: null
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
		/**
		 * 关注状态标签
		 */
		followStatusSpan(){
			const {user, isMutual, isFollowed} = this;
			if(isMutual || user.attributes.is_mutual){
				return '互相关注';
			}

			return isFollowed ? '已关注': '关注TA';
		}
	},
	methods: {
		/**
		 * 反选关注
		 */
		async toggleFollowButton() {
			const { isFollowed } = this;
			return isFollowed ? await this.unfollow() : await this.follow();
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
				this.isMutual = rs.data.attributes.is_mutual;
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
				this.isMutual = false;
			}
		},
	},
};
</script>

<style>
</style>