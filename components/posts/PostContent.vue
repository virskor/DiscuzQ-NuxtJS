<template>
	<div>
		<!--内容-->
		<div
			@click="onTapUrl"
			class="clickable ma-2 pl-3"
			v-html="formatRichText(post.attributes.contentHtml || '')"
		></div>
	</div>
</template>

<script>
import s9e from "~/utils/s9e";
import urlParser from "~/utils/urlParser";

export default {
	props: {
		/**
		 * 用于渲染的内容数据
		 */
		post: Object,
		/**
		 * 关联的主题
		 */
		thread: Object,
	},
	methods: {
		formatRichText(html) {
			// eslint-disable-next-line no-param-reassign
			return s9e.parse(html);
		},
		/**
		 * 打开帖子详情
		 */
		async onTapUrl(event) {
			const { post, thread } = this;
			event.preventDefault();

			if (await this.preventSpecialSpanClick(event.srcElement)) {
				return;
			}

			this.$router.push({
				path: `/posts/${post.id}`,
				query: { threadID: thread.id },
			});
		},
		/**
		 * prevent span click
		 */
		async preventSpecialSpanClick(element) {
			return urlParser(element);
		},
	},
};
</script>

<style>
</style>