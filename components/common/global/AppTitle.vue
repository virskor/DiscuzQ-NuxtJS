<template>
	<v-toolbar dense :color="appbarColor" :dark="appConf.appbarDark" flat class="apptitle">
		<v-btn v-if="showArrow && $route.path != '/'" @click="$router.go(-1)" color="primary" icon>
			<v-icon>mdi-arrow-left</v-icon>
		</v-btn>

		<v-toolbar-title class="font-weight-black">{{title}}</v-toolbar-title>
		<v-spacer />

		<slot />
		<!--用户登录状态栏-->
		<UserStatusBar />
	</v-toolbar>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import UserStatusBar from "~/components/users/UserStatusBar";

export default {
	props: {
		/**
		 * title
		 */
		title: String,
		/**
		 * color
		 */
		color: String,
		/**
		 * dark
		 */
		dark: Boolean,
	},
	data() {
		return {
			showArrow: true,
		};
	},
	computed: {
		...mapGetters({
			appConf: types.GETTERS_APPCONF,
		}),
		appbarColor() {
			const { appConf, color } = this;
			if (color) {
				return color;
			}

			if (appConf.appbarColor) {
				return appConf.appbarColor;
			}

			if (appConf.dark && !appConf.appbarColor) {
				return "grey darken-4";
			}

			return "white";
		},
	},
	components: {
		UserStatusBar,
	},
};
</script>

<style lang="less">
.apptitle {
	border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>