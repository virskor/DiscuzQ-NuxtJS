<template>
	<div>
		<AppTitle title="话题详情">
			<ThreadsFiltersMenu />
		</AppTitle>
		<v-container>
			<TopicDetailCard :topicID="topicID"></TopicDetailCard>
			<ThreadList :topicID="topicID" />
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import ThreadList from "~/components/threads/ThreadsList";
import ThreadsFiltersMenu from "~/components/threads/ThreadsFiltersMenu";
import TopicDetailCard from "~/components/topics/TopicDetailCard";

export default {
	validate({ params }) {
		// 必须是number类型
		return /^\d+$/.test(params.id);
	},
	async asyncData({ params, error }) {
		return { topicID: params.id };
	},
	data() {
		return {};
	},
	components: {
		ThreadList,
		ThreadsFiltersMenu,
		TopicDetailCard,
	},
};
</script>

<style>
</style>