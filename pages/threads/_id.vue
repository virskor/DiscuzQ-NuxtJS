<template>
	<div v-if="thread">
		<AppTitle :title="title || '帖子详情'">
			<SearchField />
		</AppTitle>
		<v-alert
			class="ma-0"
			v-if="thread.type == 2 && threadVideo.attributes.status == 0"
			tile
			text
			dense
			dark
			type="error"
			>视频正在转码中，转码成功后才能正常显示！</v-alert
		>

		<v-alert
			class="ma-0"
			v-if="thread.type == 2 && threadVideo.attributes.status == 2"
			tile
			text
			dense
			dark
			type="error"
			>视频转码失败，转码成功才能正常显示！</v-alert
		>

		<div
			v-if="thread.attributes.price != '0.00' && !thread.attributes.paid"
		>
			<v-alert class="ma-0" tile dense dark type="warning"
				>需要付费来 继续查看这个帖子或者包含的内容</v-alert
			>
		</div>

		<!--渲染视频-->
		<Player
			v-if="threadVideo"
			:thread="thread"
			:threadVideo="threadVideo"
			hideThumb
			class="pa-4"
			block
			height="600"
		></Player>

		<v-container>
			<!--渲染发布用户的信息-->
			<ThreadCardUser
				:firstPost="firstPost"
				:user="author"
				allowFollow
			></ThreadCardUser>

			<!--渲染内容-->
			<template v-if="firstPost">
				<!--
            渲染用户发布的帖子内容
			如果是顶置的帖子，那么就不渲染内容
				-->
				<v-card tile flat>
					<ThreadContents
						class="pl-5 pr-5 text mb-3"
						:thread="thread"
						:firstPost="firstPost"
					></ThreadContents>
					<!--附件-->
					<AttachmentImages
						class="pl-5 pr-5"
						:attachments="images"
					></AttachmentImages>
					<!--附件文件-->
					<template v-for="(a, i) in attachments">
						<div :key="i" class="pl-5 pr-5">
							<ThreadAttchmentsFileIcon
								enableDownload
								disableRemove
								class="mr-2 mb-2"
								:attachment="a"
							></ThreadAttchmentsFileIcon>
						</div>
					</template>

					<div>
						<!--打赏-->
						<RewardButton :thread="thread"></RewardButton>

						<!--购买主题-->
						<BuyThreadButton :thread="thread"></BuyThreadButton>
					</div>

					<!--打赏记录-->
					<RewardedUsers
						:rewardedUsers="mapRewardedUsers"
						:thread="thread"
					></RewardedUsers>

					<!---渲染点赞评论分享-->
					<ThreadCardQuickActions
						showExt
						showViewCount
						:firstPost="firstPost"
						:thread="thread"
					></ThreadCardQuickActions>
				</v-card>
			</template>
		</v-container>

		<v-container>
			<!--评论列表-->
			<PostsList v-if="!$_.isEmpty(thread)" :thread="thread"></PostsList>
		</v-container>
	</div>
</template>

<script>
import threadsAPI from "~/api/threads";

import ThreadCardUser from "~/components/threads/ThreadCardUser";
import AttachmentImages from "~/components/attachments/AttachmentImages";
import ThreadContents from "~/components/threads/ThreadContents";
import ThreadCardQuickActions from "~/components/threads/ThreadCardQuickActions";
import PostsList from "~/components/posts/PostsList";
import Player from "~/components/player/Player";
import RewardButton from "~/components/financial/RewardButton";
import RewardedUsers from "~/components/financial/RewardedUsers";
import BuyThreadButton from "~/components/financial/BuyThreadButton";
import attachmentsAPI from "~/api/attachments";
import ThreadAttchmentsFileIcon from "~/components/attachments/ThreadAttchmentsFileIcon";
import { TITLE_MODE } from "highlight.js";

const defaultTitle = "帖子详情";

export default {
	validate({ params }) {
		// 必须是number类型
		return /^\d+$/.test(params.id);
	},
	async asyncData({ app, params, error }) {
		try {
			const rs = await threadsAPI.getThread(params.id, {});
			if (!rs) {
				return error({
					statusCode: 502,
					message: "该主题暂时无法查看，请刷新重试",
				});
			}

			const thread = rs.data;
			const included = rs.included;

			let title = thread.attributes.title || "";
			const firstPost = included.find(
				(it) =>
					it.type == "posts" &&
					it.id == thread.relationships.firstPost.data.id
			);

			/**
			 * 处理没有标题的帖子的SEO
			 */
			if (!title) {
				title = firstPost.attributes.content;
				title = `${title.substr(0, 30)}...`;
			}

			// ssr
			app.head.title = title;

			return { included, thread };
		} catch (error) {
			throw error;
		}
	},
	head() {
		const { title } = this;
		return {
			title,
		};
	},
	data() {
		return {
			/**
			 * 上传类型
			 */
			uploadTypes: attachmentsAPI.types,
		};
	},
	computed: {
		/**
		 * 计算帖子标题属性
		 */
		title() {
			const { thread, firstPost } = this;

			if (!thread) {
				return defaultTitle;
			}

			let title = thread.attributes.title || "";

			/**
			 * 处理没有标题的帖子的SEO
			 */
			if (!title) {
				title = firstPost.attributes.content;
				title = `${title.substr(0, 30)}...`;
			}

			return title || defaultTitle;
		},
		/**
		 * author
		 * 用户模型，作者，指发帖人
		 */
		author() {
			const { included, thread } = this;
			return included.find(
				(it) =>
					it.type == "users" &&
					it.id == thread.relationships.user.data.id
			);
		},
		/**
		 * first post
		 */
		firstPost() {
			const { included, thread } = this;
			return included.find(
				(it) =>
					it.type == "posts" &&
					it.id == thread.relationships.firstPost.data.id
			);
		},
		/**
		 * 视频模型
		 */
		threadVideo() {
			const { included, thread } = this;

			if (this.$_.isEmpty(thread.relationships.threadVideo)) {
				return null;
			}

			return included.find(
				(it) =>
					it.type == "thread-video" &&
					it.id == thread.relationships.threadVideo.data.id
			);
		},
		/**
		 * 取得主题关联的附件
		 */
		images() {
			const { included, thread, firstPost } = this;
			if (!firstPost) {
				return [];
			}
			let firstPostImages = firstPost.relationships.images.data || [];
			firstPostImages = firstPostImages.map((it) => it.id); /// map出ID

			return included.filter(
				(it) => it.id == firstPostImages.find((el) => el == it.id)
			);
		},
		/**
		 * 上传的文件附件
		 */
		attachments() {
			const { included, uploadTypes } = this;
			if (!included) {
				return [];
			}

			const attachments = included.filter(
				(it) =>
					it.type == "attachments" &&
					it.attributes.type ==
						uploadTypes.UPLOAD_TYPE_THREAD_ATTACHMENT
			);

			return attachments || [];
		},
		/**
		 * 打赏的用户
		 */
		mapRewardedUsers() {
			const { included, thread } = this;

			const relatedRewardedUsers =
				thread.relationships.rewardedUsers.data;

			if (this.$_.isEmpty(relatedRewardedUsers)) {
				return null;
			}

			const users = relatedRewardedUsers.map((el) => el.id);
			return users.map((u) =>
				included.find((el) => el.type == "users" && el.id == u)
			);
		},
	},
	mounted() {
		this.$nextTick(async () => {
			const { threadVideo } = this;
			if (threadVideo) {
				await this.$store.dispatch("updateAppConf", {
					appbarDark: true,
					appbarColor: "black",
				});
			}
		});
	},
	beforeDestroy() {
		this.$nextTick(async () => {
			await this.$store.dispatch("updateAppConf", {
				appbarDark: false,
				appbarColor: null,
			});
		});
	},
	components: {
		ThreadCardUser,
		AttachmentImages,
		ThreadContents,
		ThreadCardQuickActions,
		PostsList,
		Player,
		RewardButton,
		RewardedUsers,
		BuyThreadButton,
		ThreadAttchmentsFileIcon,
	},
};
</script>

<style>
</style>