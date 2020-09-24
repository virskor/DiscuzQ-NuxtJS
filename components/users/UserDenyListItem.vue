<template>
	<v-list-item>
		<v-list-item-avatar :size="50" tile>
			<Avatar :user="user"></Avatar>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title class="font-weight-black">{{user.attributes.username}}</v-list-item-title>
			<v-list-item-subtitle>{{user.attributes.signature|| ''}}</v-list-item-subtitle>
		</v-list-item-content>
		<v-list-item-icon>
			<v-btn
				:loading="loading"
				:ripple="false"
				@click="undeny"
				depressed
				color="primary"
				text
				small
			>取消屏蔽</v-btn>
		</v-list-item-icon>
	</v-list-item>
</template>

<script>
import usersAPI from "~/api/users";

import Avatar from "~/components/users/Avatar";

export default {
	props: {
		/**
		 * 用户模型
		 */
		user: Object,
	},
	components: {
		Avatar,
	},
	data() {
		return {
			loading: false,
		};
	},
	methods: {
		/**
		 * 取消屏蔽
		 */
		async undeny() {
			const { user } = this;
			this.loading = true;

			const rs = await usersAPI.undeny(user);

			this.loading = false;

			if (rs) {
                this.$emit('undeny', user);
			}
		},
	},
};
</script>

<style>
</style>