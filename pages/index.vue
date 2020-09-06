<template>
	<div>
		<AppTitle  :title="`${forum.attributes.set_site.site_name || '首页'}`">
			<ThreadsFilters />
		</AppTitle>
		<v-alert class="ma-0" tile text dense dark type="info">
			第三方PC模板，现在您可以使用的功能并不完整，亦或者存在BUG。我们将于9月15日左右发布。演示数据来自discuz.chat
		</v-alert>

		<v-container fluid>
			<ThreadList/>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import ThreadList from "~/components/threads/ThreadsList";
import ThreadsFilters from "~/components/threads/ThreadsFilters";

export default {
	head() {
		return {
			title: "首页",
		};
	},

	components: { ThreadList, ThreadsFilters },

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