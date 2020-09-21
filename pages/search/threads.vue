<template>
	<div>
		<AppTitle title="帖子搜索">
			<v-text-field
				v-model="keyword"
				solo-inverted
				flat
				dense
				rounded
				hide-details
				label="搜索帖子"
				prepend-inner-icon="mdi-magnify"
			></v-text-field>

			<ThreadsFiltersMenu />
		</AppTitle>

		<v-container>
			<ThreadList
				:keyword="keyword"
			></ThreadList>
		</v-container>
	</div>
</template>

<script>
import ThreadsFiltersMenu from "~/components/threads/ThreadsFiltersMenu";
import ThreadList from "~/components/threads/ThreadsList";

export default {
	head() {
		return {
			title: "帖子搜索",
		};
	},
	data() {
		return {
			/**关键字 */
			keyword: this.$route.query.keyword || "",
		};
	},
	components: { ThreadsFiltersMenu, ThreadList },
};
</script>

<style>
</style>