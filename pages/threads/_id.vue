<template>
	<div v-if="thread">
		<AppTitle title="帖子详情"></AppTitle>
		<v-alert
			class="ma-0"
			v-if="thread.type == 2 && threadVideo.attributes.status == 0"
			tile
			text
			dense
			dark
			type="error"
		>视频正在转码中，转码成功后才能正常显示！</v-alert>

		<v-alert
			class="ma-0"
			v-if="thread.type == 2 && threadVideo.attributes.status == 2"
			tile
			text
			dense
			dark
			type="error"
		>视频转码失败，转码成功才能正常显示！</v-alert>

		<div v-if="thread.attributes.price != '0.00' && !thread.attributes.paid">
			<v-alert class="ma-0" tile dense dark type="warning">需要付费来 继续查看这个帖子或者包含的内容</v-alert>
		</div>

		<!--渲染视频-->
		<Player v-if="threadVideo" class="pa-4" block height="600" :threadVideo="threadVideo"></Player>

		<v-container fluid>
			<!--渲染发布用户的信息-->
			<ThreadCardUser :firstPost="firstPost" :user="author" allowFollow></ThreadCardUser>

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
					<Attachments :attachments="attachments"></Attachments>

					<div>
						<!--打赏-->
						<RewardButton :thread="thread"></RewardButton>

						<!--购买主题-->
						<BuyThreadButton :thread="thread"></BuyThreadButton>
					</div>

					<!--打赏记录-->
					<RewardedUsers :rewardedUsers="mapRewardedUsers" :thread="thread"></RewardedUsers>

					<!---渲染点赞评论分享-->
					<ThreadCardQuickActions showExt showViewCount :firstPost="firstPost" :thread="thread"></ThreadCardQuickActions>
				</v-card>
			</template>

			<!--评论列表-->
			<PostsList v-if="!$_.isEmpty(thread)" :thread="thread"></PostsList>
		</v-container>
	</div>
</template>

<script>
import threadsAPI from "~/api/threads";

import ThreadCardUser from "~/components/threads/ThreadCardUser";
import Attachments from "~/components/attachments/Attachments";
import ThreadContents from "~/components/threads/ThreadContents";
import ThreadCardQuickActions from "~/components/threads/ThreadCardQuickActions";
import PostsList from "~/components/posts/PostsList";
import Player from "~/components/player/Player";
import RewardButton from "~/components/financial/RewardButton";
import RewardedUsers from "~/components/financial/RewardedUsers";
import BuyThreadButton from "~/components/financial/BuyThreadButton";

const defaultTitle = "帖子详情";

export default {
	validate({ params }) {
		// 必须是number类型
		return /^\d+$/.test(params.id);
	},
	async asyncData({ params, error }) {
		try {
			const rs = await threadsAPI.getThread(params.id, {});
			if (!rs) {
				return error({
					statusCode: 502,
					message: "该主题暂时无法查看，请刷新重试",
				});
			}

			return { included: rs.included, thread: rs.data };
		} catch (error) {
			throw error;
		}
	},
	head() {
		const { title } = this;
		return {
			title,
			meta: [
				{
					hid: "description",
					name: "description",
					content: "Home page description",
				},
			],
		};
	},
	computed: {
		/**
		 * 计算帖子标题属性
		 */
		title() {
			const { thread } = this;

			if (!thread) {
				return defaultTitle;
			}

			return thread.attributes.title || defaultTitle;
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
		attachments() {
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
		Attachments,
		ThreadContents,
		ThreadCardQuickActions,
		PostsList,
		Player,
		RewardButton,
		RewardedUsers,
		BuyThreadButton,
	},
};
</script>

<style>
</style>