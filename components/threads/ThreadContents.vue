<template>
	<div>
		<!--标题-->
		<div
			class="text-h6 mb-1 font-weight-black clickable"
			@click="onWantOpenThreadDetail"
			v-if="title"
		>{{title}}</div>
		<!--显示分类-->
		<CategoriesLabel v-if="thread.relationships.category" :categoryID="thread.relationships.category.data.id"></CategoriesLabel>
		
		<!--内容-->
		<div v-if="!hideContents" @click="onWantOpenThreadDetail" class="clickable" v-html="formatRichText(contents)"></div>
	
		
	</div>
</template>

<script>
import s9e from "~/utils/s9e";
import urlParser from "~/utils/urlParser";
import CategoriesLabel from "~/components/categories/CategoriesLabel";

export default {
	props: {
		/**
		 * 用于渲染的内容数据
		 */
		contents: String,
		/**
		 * 是否是楼层
		 */
		isFloor: Boolean,
		/**
		 * 标题
		 */
		title: String,
		/**
		 * 隐藏contents
		 */
		hideContents: Boolean,

		/**
		 * 主题
		 */
		thread: Object,
	},
	methods: {
		/**
		 * formatHTML
		 */
		formatRichText(html) {
			// eslint-disable-next-line no-param-reassign
			return s9e.parse(html);
		},
		/**
		 * 打开帖子详情
		 */
		async onWantOpenThreadDetail(event) {
			const { thread, isFloor } = this;

			event.preventDefault();

			if (await this.preventSpecialSpanClick(event.srcElement)) {
				return;
			}

			if (!isFloor) {
				return;
			}

			this.$router.push({
				path: `/threads/${thread.id || 0}`,
			});
		},
		/**
		 * prevent span click
		 */
		async preventSpecialSpanClick(element) {
			return urlParser(element);
		},
	},
	components: {
		CategoriesLabel
	}
};
</script>

<style>
</style>