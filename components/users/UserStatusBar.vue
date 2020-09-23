<template>
	<div class="userStatusBar">
		<div v-if="!hasLogined">
			<v-btn depressed small color="primary" @click="login">登录</v-btn>
			<!-- <v-btn depressed text small color="primary" @click="register">注册</v-btn> -->
		</div>
		<div v-else>
			<v-btn outlined color="transparent" dark>
				<Avatar :size="40" :user="user" />
			</v-btn>
		</div>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";
import Avatar from "~/components/users/Avatar";

export default {
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		hasLogined() {
			const { user } = this;
			return !this.$_.isEmpty(user);
		},
	},
	data() {
		return {
			menu: false,
		};
	},
	methods: {
		/**
		 * 登录跳转
		 */
		login() {
			this.$router.push("/users/login");
		},
		/**
		 * 注册跳转
		 */
		register() {
			this.$router.push("/users/register");
		},
	},
	components: {
		Avatar,
	},
};
</script>

<style scoped lang="less">
</style>