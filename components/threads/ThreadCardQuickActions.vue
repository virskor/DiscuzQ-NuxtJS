<template>
	<div>
		<v-divider v-if="showViewCount"></v-divider>
		<v-card-actions :class="showViewCount ? null: 'pa-0'">
			<span
				v-if="showViewCount"
				class="ml-3 v-list-item__subtitle"
			>查看：{{thread.attributes.viewCount || 0}}次&nbsp;&nbsp;评论：{{thread.attributes.postCount - 1 || 0}}条</span>
			<v-spacer></v-spacer>
			<!-- <v-btn icon>
				<v-icon>mdi-flag</v-icon>
			</v-btn>
			-->
			<PostLikeButton :post="firstPost"></PostLikeButton>

			<ThreadFavoriteButton :thread="thread"></ThreadFavoriteButton>

			<!--分享-->
			<v-btn color="transparent" @click="share" depressed>
				<v-icon left>mdi-share-outline</v-icon> 分享
			</v-btn>

			<!--拓展菜单，包含编辑等功能-->
			<ThreadCardQuickActionsExt :thread="thread" v-if="showExt"></ThreadCardQuickActionsExt>
		</v-card-actions>
	</div>
</template>

<script>
import threadsAPI from "~/api/threads";
import clipboardy from "~/utils/clipboard";
import PostLikeButton from "~/components/posts/PostLikeButton";
import ThreadFavoriteButton from "~/components/threads/ThreadFavoriteButton";
import ThreadCardQuickActionsExt from "~/components/threads/ThreadCardQuickActionsExt";

export default {
	props: {
		/**
		 * 当前主题对象
		 */
		thread: Object,
		/**
		 * 当前主题的firstPost
		 */
		firstPost: Object,
		/**
		 * show view count
		 */
		showViewCount: Boolean,
		/**
		 * show ext
		 */
		showExt: Boolean,
	},
	methods: {
		/**
		 * 分享
		 * 复制分享链接
		 */
		share() {
			const { thread } = this;
			const threadUrl = `${window.location.origin}/threads/${thread.id}`;

			clipboardy.write(
				`${thread.attributes.title || ""} 链接：${threadUrl}`
			);

			this.$swal(
				"复制成功!",
				"已经将链接复制到剪辑版，快快分享吧!",
				"success",
				{
					button: "好的",
				}
			);
		},
	},
	components: {
		PostLikeButton,
		ThreadFavoriteButton,
		ThreadCardQuickActionsExt,
	},
};
</script>

<style>
</style>