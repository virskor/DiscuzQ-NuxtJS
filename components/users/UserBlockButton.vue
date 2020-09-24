<template>
	<v-btn @click=" _ => blocked ? undeny() : deny()" :loading="loading" text depressed>
		<v-icon left>mdi-block-helper</v-icon>
		{{label}}
	</v-btn>
</template>

<script>
import usersAPI from "~/api/users";

export default {
	props: {
		/**
		 * 要举报的用户
		 */
		user: Object,
	},
	computed: {
		/**
		 * 显示用户屏蔽状态的标签
		 */
		label() {
			const { user, blocked } = this;

			if (blocked === null) {
				return user.attributes.denyStatus ? "取消屏蔽" : "屏蔽";
			}

			return blocked ? "取消屏蔽" : "屏蔽";
		},
	},
	data() {
		return {
			/**
			 * 本次是否点击了
			 * 默认为null
			 */
			blocked: null,
			/**
			 * loading
			 */
			loading: false,
		};
	},
	methods: {
		/**
		 * 屏蔽用户
		 */
		async deny() {
			const { user } = this;
			this.loading = true;

			const rs = await usersAPI.deny(user);

			this.loading = false;

			if (rs) {
				this.blocked = true;
			}
		},
		/**
		 * 取消屏蔽
		 */
		async undeny() {
			const { user } = this;
			this.loading = true;

			const rs = await usersAPI.undeny(user);

			this.loading = false;

			if (rs) {
				this.blocked = false;
			}
		},
	},
};
</script>