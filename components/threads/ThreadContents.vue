<template>
	<div>
		<!--标题-->
		<div
			class="text-h6 mb-1 font-weight-black clickable"
			@click="onWantOpenThreadDetail"
			v-if="title"
		>{{title}}</div>
		<!--标签-->
		<div>
			<v-chip label outlined v-if="isSticky" class="mb-1" color="primary" small>置顶</v-chip>
			<v-chip label outlined v-if="isEssence" class="mb-1" color="pink" small>精华</v-chip>
			<v-chip label outlined v-if="shouldPay" color="amber" small>付费</v-chip>
			<!--显示分类-->
			<CategoriesLabel
				v-if="thread.relationships.category"
				:categoryID="thread.relationships.category.data.id"
			></CategoriesLabel>
		</div>

		<!--内容-->
		<div
			v-if="!hideContents"
			@click="onWantOpenThreadDetail"
			class="clickable"
			v-html="formatRichText(contents)"
		></div>
	</div>
</template>

<script>
import s9e from "~/utils/s9e";
import urlParser from "~/utils/urlParser";
import CategoriesLabel from "~/components/categories/CategoriesLabel";

export default {
	props: {
		/**
		 * 是否是楼层
		 */
		isFloor: Boolean,
		/**
		 * 主题
		 */
		thread: Object,
		/**
		 * post
		 */
		firstPost: Object,
	},
	computed: {
		/**
		 * 是否隐藏内容
		 */
		hideContents() {
			const { isFloor, title, thread, isSticky } = this;
			if(!isFloor){
				return false;
			}
			
			if (title && isSticky) {
				return true;
			}

			if (isFloor && title) {
				return true;
			}

			return false;
		},
		/** 内容 */
		contents() {
			const { firstPost } = this;
			return firstPost.attributes.contentHtml || "";
		},
		/**
		 * 文章标题
		 */
		title() {
			const { thread } = this;
			return thread.attributes.title || "";
		},
		/**
		 * 是否是付费贴
		 */
		shouldPay() {
			const { thread } = this;
			return thread.attributes.price != "0.00";
		},
		/**
		 * 是否是顶置的帖子
		 */
		isSticky() {
			const { thread } = this;
			return thread.attributes.isSticky;
		},
		/**
		 * 是否加精华
		 */
		isEssence() {
			const { thread } = this;
			return thread.attributes.isEssence;
		},
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
		CategoriesLabel,
	},
};
</script>

<style>
</style>