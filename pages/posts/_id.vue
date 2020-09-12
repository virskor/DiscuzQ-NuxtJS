<template>
	<div>
		<AppTitle title="评论"></AppTitle>
		<v-container>
			<div v-if="loading">
				<template>
					<v-sheet class="px-3 pb-3">
						<v-skeleton-loader
							v-for="(_, i) in 20"
							:key="i"
							ref="skeleton"
							type="list-item-avatar-two-line, table-tfoot"
							class="mx-auto"
						></v-skeleton-loader>
					</v-sheet>
				</template>
			</div>
		</v-container>

		<v-container v-if="postData && threadData">
			<v-card class="pb-2" flat tile>
				<!--该评论关联的帖子-->
				<ThreadCardUser :firstPost="postData.data" :user="postRelatedUser"></ThreadCardUser>
				<!--该评论关联的内容-->
				<PostContent :thread="threadData.data" :post="postData.data"></PostContent>
				<!--附件-->
				<AttachmentImages :attachments="attachments"></AttachmentImages>

				<!--显示关联的原帖-->
				<ThreadCardSimplified
					class="ma-4"
					v-if="threadData"
					:user="threadData.included.find(el => el.type == 'users')"
					:firstPost="threadData.included.find(el => el.type == 'posts')"
					:thread="threadData.data"
				></ThreadCardSimplified>
			</v-card>
		</v-container>

		<v-container v-if="postData && threadData">
			<PostsList :relatedPost="postData.data" :thread="threadData.data"></PostsList>
		</v-container>
	</div>
</template>

<script>
import threadsAPI from "~/api/threads";
import postsAPI from "~/api/posts";
import ThreadCardSimplified from "~/components/threads/ThreadCardSimplified";
import ThreadCardUser from "~/components/threads/ThreadCardUser";
import PostContent from "~/components/posts/PostContent";
import PostsList from "~/components/posts/PostsList";
import AttachmentImages from "~/components/attachments/AttachmentImages";

export default {
	validate({ params }) {
		// 必须是number类型
		return /^\d+$/.test(params.id);
	},
	head() {
		return {
			title: "评论",
		};
	},
	data() {
		return {
			threadID: this.$route.query.threadID || "",

			postID: this.$route.params.id || 0,
			/**
			 * 主题信息
			 * 将被Async data覆盖
			 */
			threadData: null,
			/**
			 * 查看的评论信息
			 */
			postData: null,
			/**
			 * 加载中
			 */
			loading: true,
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.getPosts();
			this.loading = false;
		});
	},
	computed: {
		/**
		 * 该评论关联的用户
		 */
		postRelatedUser() {
			const { postData } = this;
			if (!postData) {
				return null;
			}

			const relatedUser = postData.data.relationships.user.data;

			return postData.included.find(
				(el) => el.type == "users" && el.id == relatedUser.id
			);
		},
		/**
		 * 取得主题关联的附件
		 */
		attachments() {
			const { postData } = this;

			let images = postData.data.relationships.images.data || [];
			images = images.map((it) => it.id); /// map出ID

			return postData.included.filter(
				(it) => it.id == images.find((el) => el == it.id)
			);
		},
	},
	async asyncData({ query, params, error }) {
		try {
			const rs = await threadsAPI.getThreadNoPosts(query.threadID, {
				"filter[isDeleted]": "no",
			});

			if (!rs) {
				return error({
					statusCode: 404,
					message: "该主题暂时无法查看或已经被删除",
				});
			}

			return { threadData: rs };
		} catch (error) {
			throw error;
		}
	},
	methods: {
		/**
		 * get posts
		 * 获取关联的评论
		 */
		async getPosts() {
			const { postID } = this;
			const rs = await postsAPI.getPost(postID);

			if (rs) {
				this.postData = rs;
				return true;
			}
			return false;
		},
	},
	components: {
		ThreadCardSimplified,
		ThreadCardUser,
		PostContent,
		PostsList,
		AttachmentImages,
	},
};
</script>

<style>
</style>