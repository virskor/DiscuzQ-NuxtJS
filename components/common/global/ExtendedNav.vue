<template>
	<keep-alive>
		<v-toolbar-items class="hidden-sm-and-down">
			<v-btn
				@click="clickItem(n)"
				depressed
				text
				color="primary"
				v-for="(n, i) in navs"
				:key="i"
			>{{n.caption || ''}}</v-btn>
		</v-toolbar-items>
	</keep-alive>
</template>

<script>
import discuzConf from "~/discuz.config";

export default {
	data() {
		return {
			navs: discuzConf.extendedNavigations || [],
		};
	},
	methods: {
		/**
		 * 用户点击菜单
		 */
		clickItem(n) {
			if (n.newWidow) {
				let win = window.open();
				win.location.href = n.href;
				return;
			}

			window.location.href = n.href;
		},
	},
};
</script>

<style>
</style>