<template>
	<div>
		<!--简化顶置主题-->
		<v-card flat class="mb-2" v-if="isSticky">
			<div @click="$router.push(`/threads/${thread.id || 0}`)" class="pb-1 pt-2 ml-5" v-if="title">
				<v-chip label outlined class="mb-1" color="primary" small>顶置</v-chip>
				<span class="font-weight-black clickable" v-html=" title || formatRichText(contents)"></span>
			</div>
			<v-divider></v-divider>
		</v-card>

		<!--普通-->
		<v-card
			:ripple="false"
			class="thread-card mt-2 pb-2 pt-2 pr-2"
			:id="`thread-${thread.id}`"
			flat
			v-else-if="!showHideThread"
		>
			<!--渲染发布用户的信息-->
			<ThreadCardUser :firstPost="firstPost" :user="user"></ThreadCardUser>

			<div class="floor">
				<!--
            渲染用户发布的帖子内容
			如果是顶置的帖子，那么就不渲染内容
				-->
				<ThreadContents class="pl-5 pr-5" isFloor :thread="thread" :firstPost="firstPost"></ThreadContents>

				<!--
			渲染图片
			如果是顶置的帖子，那么就不渲染附件
				-->
				<AttachmentImages
					class="pl-5 pr-5"
					grid
					v-if="!thread.attributes.isSticky"
					:attachments="attachments"
				></AttachmentImages>

				<!--渲染视频-->
				<Player class="pl-5 pr-5 mt-2 rounded-lg" :threadVideo="threadVideo"></Player>
			</div>
			<!---渲染点赞评论分享-->
			<ThreadCardQuickActions :firstPost="firstPost" :thread="thread"></ThreadCardQuickActions>
		</v-card>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import ThreadCardUser from "~/components/threads/ThreadCardUser";
import AttachmentImages from "~/components/attachments/AttachmentImages";
import ThreadCardQuickActions from "~/components/threads/ThreadCardQuickActions";
import ThreadContents from "~/components/threads/ThreadContents";
import Player from "~/components/player/Player";
import s9e from "~/utils/s9e";

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
	computed: {
		...mapGetters({
			appConf: types.GETTERS_APPCONF,
		}),
		/**
		 * 是否是顶置的帖子
		 */
		isSticky() {
			const { thread } = this;
			return thread.attributes.isSticky;
		},
		/**
		 * 文章标题
		 */
		title() {
			const { thread } = this;
			return thread.attributes.title || "";
		},
		/** 内容 */
		contents() {
			const { firstPost } = this;
			return firstPost.attributes.contentHtml || "";
		},
		/**
		 * 是否需要继续支付
		 */
		shouldContinueToPay() {
			const { thread } = this;
			return thread.attributes.price != "0.00" && !thread.attributes.paid;
		},
		/**
		 * 是否影藏当前的帖子
		 */
		showHideThread() {
			const { appConf, shouldContinueToPay } = this;
			if (!appConf.removeChargedThreads) {
				return false;
			}

			if (appConf.removeChargedThreads && !shouldContinueToPay) {
				return false;
			}

			return true;
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
	},
	components: {
		ThreadCardUser,
		AttachmentImages,
		ThreadCardQuickActions,
		ThreadContents,
		Player,
	},
};
</script>

<style lang="less">
</style>