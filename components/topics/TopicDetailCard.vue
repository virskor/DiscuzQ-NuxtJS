<template>
	<v-card flat tile v-if="topicDetail">
		<v-card-title class="text-h4 font-weight-black">#{{topicDetail.attributes.content}}#</v-card-title>
        <v-card-subtitle>热度： {{topicDetail.attributes.view_count}} 内容数：{{topicDetail.attributes.thread_count}}</v-card-subtitle>
        <v-card-actions>
            <v-btn @click="$router.push('/views/topics')" color="primary" text >查看更多话题</v-btn>
        </v-card-actions>
        <v-divider></v-divider>
	</v-card>
</template>

<script>
import topicAPI from "~/api/topics";

export default {
	props: {
		/**
		 * 要显示的话题ID
		 */
		topicID: String,
	},
	mounted() {
		this.$nextTick(async () => {
			await this.getTopicDetail();
		});
	},
	data() {
		return {
			topicDetail: null,
		};
	},
	methods: {
		/**
		 * 获取话题详情
		 */
		async getTopicDetail() {
			const { topicID } = this;
			const rs = await topicAPI.getTopicDetail(topicID);
			if (rs) {
				this.topicDetail = rs.data;
			}
		},
	},
};
</script>

<style>
</style>