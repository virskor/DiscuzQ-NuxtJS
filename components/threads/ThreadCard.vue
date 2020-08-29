<template>
	<v-card
		:ripple="false"
		elevation="0"
		class="thread-card pb-2 pt-2"
		:id="`thread-${thread.id}`"
		tile
	>
		<!--渲染发布用户的信息-->
		<ThreadCardUser :firstPost="firstPost" :user="user"></ThreadCardUser>
		<div class="floor">
			<!--
            渲染用户发布的帖子内容
			如果是顶置的帖子，那么就不渲染内容
			-->
			<ThreadContents
				class="pl-5 pr-5"
				isFloor
				:thread="thread"
				:hideContents="thread.attributes.isSticky"
				:title="thread.attributes.title||''"
				:contents="firstPost.attributes.contentHtml || ''"
				:isSticky="thread.attributes.isSticky"
				:isEssence="thread.attributes.isEssence"
				:shouldPay="thread.attributes.price != '0.00'"
			></ThreadContents>

			<!--
			渲染图片
			如果是顶置的帖子，那么就不渲染附件
			-->
			<ThreadAttachments grid v-if="!thread.attributes.isSticky" :attachments="attachments"></ThreadAttachments>

			<!--渲染视频-->
			<Player class="pl-5 pr-5 mt-2 rounded-lg" :threadVideo="threadVideo"></Player>
		</div>
		<!---渲染点赞评论分享-->
		<ThreadCardQuickActions :firstPost="firstPost" :thread="thread"></ThreadCardQuickActions>
	</v-card>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import ThreadCardUser from "~/components/threads/ThreadCardUser";
import ThreadAttachments from "~/components/threads/ThreadAttachments";
import ThreadCardQuickActions from "~/components/threads/ThreadCardQuickActions";
import ThreadContents from "~/components/threads/ThreadContents";
import Player from "~/components/player/Player";

export default {
	props: {
		/**
		 * 当前主题对象
		 */
		thread: Object,
		/**
		 * 当前主题发布的用户
		 */
		user: Object,
		/**
		 * 当前主题关联的数据
		 */
		attachments: Array,
		/**
		 * 当前主题的firstPost
		 */
		firstPost: Object,
		/**
		 * 帖子关联视频模型
		 * 一个帖子只会关联一个视频
		 */
		threadVideo: Object,
	},
	components: {
		ThreadCardUser,
		ThreadAttachments,
		ThreadCardQuickActions,
		ThreadContents,
		Player,
	},
	mounted() {},
	methods: {},
};
</script>

<style lang="less">
.thread-card {
	border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>