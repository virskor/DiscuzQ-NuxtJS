<template>
	<div>
		<!--内容-->
		<div @click="onTapUrl" class="clickable ma-2 pl-3" v-html="formatRichText(contents)"></div>
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
		contents: String,
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
			event.preventDefault();

			if (await this.preventSpecialSpanClick(event.srcElement)) {
				return;
			}
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