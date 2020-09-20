<template>
	<div>
		<AppTitle :title="`${forum.attributes.set_site.site_name || '首页'}`">
			<SearchField />
			<ThreadsFilters />
		</AppTitle>

		<v-container>
			<Editor enableAttachment enablePrice lightMode></Editor>
		</v-container>

		<v-container grid-list-md>
			<v-layout row wrap>
				<v-flex md12 lg9>
					<ThreadList />
				</v-flex>

				<v-flex class="hidden-md-and-down" md3>
					<HomePageDrawer />
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import ThreadList from "~/components/threads/ThreadsList";
import ThreadsFilters from "~/components/threads/ThreadsFilters";
import Editor from "~/components/editor/Editor";
import HomePageDrawer from "~/components/navigationDrawers/HomePageDrawer";

export default {
	head() {
		return {
			title: "首页",
		};
	},

	components: {
		ThreadList,
		ThreadsFilters,
		Editor,
		HomePageDrawer,
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