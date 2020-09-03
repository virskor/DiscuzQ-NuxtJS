<template>
	<v-row no-gutters align="center" class="mr-2" justify="end">
		<v-btn @click="reply" color="transparent" :ripple="false" depressed>
			<v-icon>mdi-twitter-retweet</v-icon>
			<span>{{post.attributes.replyCount || 0}}</span>
		</v-btn>
	</v-row>
</template>

<script>
export default {
	props: {
		/**
		 * 评论模型
		 */
        post: Object,
        /**
         * 主题模型
         */
        thread: Object
	},
	methods: {
		reply() {
			const { post, thread } = this;
			this.$router.push({
				path: `/posts/${post.id}`,
				query: { threadID: thread.id },
			});
		},
	},
};
</script>

<style>
</style>