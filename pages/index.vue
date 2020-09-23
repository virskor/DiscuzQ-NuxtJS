<template>
	<div>
		<AppTitle :title="`${forum.attributes.set_site.site_name || '首页'}`">
			<SearchField />
			<ThreadsFiltersMenu v-if="$C.isMobile()" />
		</AppTitle>

		<v-container>
			<Editor enablePrice lightMode></Editor>
		</v-container>

		<v-container>
			<ThreadList />
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import ThreadList from "~/components/threads/ThreadsList";
import ThreadsFiltersMenu from "~/components/threads/ThreadsFiltersMenu";
import Editor from "~/components/editor/Editor";

export default {
	head() {
		return {
			title: "首页",
		};
	},

	components: {
		ThreadList,
		ThreadsFiltersMenu,
		Editor,
	},

	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
		}),
	},

	methods: {},
};
</script>


<style lang="less" scoped>
</style>