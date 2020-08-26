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

			<ThreadsFilters />
		</AppTitle>

		<v-container fluid>
			<ThreadList
				:keyword="keyword"
			></ThreadList>
		</v-container>
	</div>
</template>

<script>
import ThreadsFilters from "~/components/threads/ThreadsFilters";
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
	components: { ThreadsFilters, ThreadList },
};
</script>

<style>
</style>