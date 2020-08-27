<template>
	<div>
		<AppTitle  title="首页">
			<ThreadsFilters />
		</AppTitle>
		<v-alert class="ma-0" tile text dense dark type="info">
			第三方PC模板，现在您可以使用的功能并不完整。这个项目不保证上线时间。演示数据来自discuz.chat
		</v-alert>

		<v-container fluid>
			<Editor></Editor>
			<ThreadList/>
		</v-container>
	</div>
</template>

<script>
import ThreadList from "~/components/threads/ThreadsList";
import Editor from "~/components/editor/Editor";
import ThreadsFilters from "~/components/threads/ThreadsFilters";

export default {
	head() {
		return {
			title: "首页",
		};
	},

	components: { ThreadList, Editor, ThreadsFilters },

	mounted() {},

	methods: {},
};
</script>


<style lang="less" scoped>
</style>