<template>
	<v-switch v-model="$vuetify.theme.dark" hide-details inset :label="showLabel ? '夜间模式' : ''"></v-switch>
</template>

<script>
export default {
	props: {
		/**
		 * 是否展示标签
		 */
		showLabel: Boolean,
	},
	watch: {
		"$vuetify.theme.dark": function () {
			const dark = this.$vuetify.theme.dark;
			this.$store.dispatch("updateAppConf", { dark });
		},
	},
};
</script>

<style>
</style>
