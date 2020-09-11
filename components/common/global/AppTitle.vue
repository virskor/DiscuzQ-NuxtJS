<template>
	<v-app-bar :color="appbarColor || 'white'" app flat class="app-title">
		<v-toolbar :color="appbarColor || 'white'" :dark="appConf.appbarDark" dense flat>
			<v-btn v-if="showArrow && $route.path != '/'" @click="$router.go(-1)" color="primary" icon>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>

			<v-toolbar-title class="font-weight-black">{{title}}</v-toolbar-title>
			<v-spacer />

			<slot />

			<!--拓展菜单-->
			<ExtendedNav v-if="!hideExtendedNav"></ExtendedNav>

			<!--用户登录状态栏-->
			<UserStatusBar />
		</v-toolbar>
		<ClassicalNav v-if="appConf.classicalTheme"></ClassicalNav>
	</v-app-bar>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import UserStatusBar from "~/components/users/UserStatusBar";
import ExtendedNav from "~/components/common/global/ExtendedNav";
import ClassicalNav from "~/components/common/ClassicalNav";

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
		/**
		 * 隐藏导航条
		 */
		hideExtendedNav: Boolean,
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
		ExtendedNav,
		ClassicalNav,
	},
};
</script>

<style lang="less">
.app-title {
	border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
	z-index: 9 !important;
	.v-toolbar__content {
		margin: 0;
		padding: 0;
		header {
			padding: 0px 16px;
		}
	}
}
</style>