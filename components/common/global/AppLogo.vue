<template>
	<div
		:style="`width: ${width || 40}px;height: ${width || 40}`"
		@click="onWantPushRoute"
		class="logo"
	>
		<v-img :lazy-src="siteLogo" :src="siteLogo" />
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	props: {
		/**
		 * logo大小
		 */
		width: Number,

		/**
		 * 阻止点击时路由调转
		 */
		preventAutoRoute: Boolean,
	},
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
		}),
		siteLogo() {
			const { forum } = this;
			if (this.$_.isEmpty(forum)) {
				return "/logo.png";
			}

			return this.$_.isEmpty(forum.attributes.set_site.site_logo)
				? "/logo.png"
				: forum.attributes.set_site.site_logo;
		},
	},
	methods: {
		/**
		 * 用户点击Logo,则push 到首页
		 * 如果受到阻止，那么发送onWantToggleNavigation 不在做其他行为
		 */
		onWantPushRoute() {
			const { preventAutoRoute } = this;
			if (!preventAutoRoute) {
				this.$router.push("/");
				return;
			}

			this.$emit("onWantToggleNavigation", true);
		},
	},
};
</script>

<style scoped lang="less">
.logo {
	cursor: pointer;
}
</style>