<template>
	<v-btn v-if="showButton" color="primary" rounded @click="$router.push(`/users/profiles`)" text>
		<v-icon left>mdi-tooltip-edit</v-icon>资料
	</v-btn>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	props: {
		/**
		 * 按钮关联的用户
		 *
		 * 当relatedUser 为空的时候，会直接默认允许显示修改按钮，
		 * 如果传入和状态不一致，则不允许
		 */
		relatedUser: Object,
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		/**
		 * 是否显示编辑个人资料
		 */
		showButton() {
			const { relatedUser, user } = this;
			if (!user) {
				return false;
			}

			if (!relatedUser) {
				return true;
			}

			return user.id == relatedUser.id ? true : false;
		},
	},
};
</script>

<style>
</style>