<template>
	<div>
		<Editor @onPosted="loadMorePosts(true)" lightMode :post="relatedPost" :thread="thread"></Editor>
		
		<v-divider></v-divider>

		<v-toolbar flat>
			<v-toolbar-title>评论 ({{meta ? meta.postCount : 0}})</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<PostsFilter @input="loadMorePosts(true)" v-model="sort"></PostsFilter>
			</v-toolbar-items>
		</v-toolbar>
		
		<!--渲染评论列表-->
		<template v-if="!$_.isEmpty(posts)">
			<template v-for="(post, i) in posts">
				<var-box :user="mapPostUser(post.relationships.user.data.id)" :key="i" v-slot="{ user }">
					<PostCard
						v-if="user"
						:thread="thread"
						:post="post"
						:replyToUser="mapReplyToUser(post)"
						:user="user"
						:key="i"
						:attachments="mapAttachments(post)"
					></PostCard>
				</var-box>
			</template>

			<!--渲染下一页-->
			<!-- <MorePage
				caption="加载更多评论"
				:loading="loading"
				@next="loadMorePosts"
				:max="meta ? meta.pageCount : 1"
				v-model="pageNumber"
			></MorePage>-->

			<MorePage
				caption="加载更多"
				:loading="loading"
				@input="loadMorePosts"
				:length="meta ? meta.pageCount : 1"
				v-model="pageNumber"
			></MorePage>
		</template>

		<template v-else>
			<NoPosts v-if="!loading"></NoPosts>
		</template>
	</div>
</template>

<script>
import PostCard from "~/components/posts/PostCard";
import NoPosts from "~/components/posts/NoPosts";
import PostsFilter from "~/components/posts/PostsFilter";
import postsAPI from "~/api/posts";
import Editor from "~/components/editor/Editor";

export default {
	props: {
		/**
		 * 主题模型
		 */
		thread: Object,
		/**
		 * post
		 */
		relatedPost: Object,
	},
	data() {
		return {
			postsData: null,
			/**
			 * 页面
			 * pageNumber
			 */
			pageNumber: 1,
			/**
			 * 是否正在加载
			 */
			loading: false,
			/**
			 * 分页数据
			 */
			meta: null,
			/**
			 * 排序
			 */
			sort: "createdAt",
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.loadMorePosts();
		});
	},
	beforeDestroy(){
		this.postsData = null;
	},
	computed: {
		/**
		 * 评论
		 */
		posts() {
			const { postsData } = this;
			return !postsData ? [] : postsData.data;
		},
		/**
		 * 关联信息
		 */
		included() {
			const { postsData } = this;
			return !postsData ? [] : postsData.included;
		},
	},
	methods: {
		/**
		 * 取出关联的用户
		 */
		mapPostUser(id) {
			const { included } = this;
			return included.find((it) => it.type == "users" && it.id == id);
		},
		/**
		 * 取得主题关联的附件
		 */
		mapAttachments(post) {
			const { included } = this;

			let images = post.relationships.images.data || [];
			images = images.map((it) => it.id); /// map出ID

			return included.filter(
				(it) => it.id == images.find((el) => el == it.id)
			);
		},
		/**
		 * 取出回复关联的用户
		 */
		mapReplyToUser(post) {
			//replyUserId
			const replyUserId = post.attributes.replyUserId;
			if (!replyUserId) {
				return null;
			}

			const { included } = this;
			return included.find(
				(it) => it.type == "users" && it.id == replyUserId
			);
		},
		/**
		 * load more posts
		 */
		async loadMorePosts(clear) {
			if (clear === true) {
				this.pageNumber = 1;
				this.postsData = null;
			}
			const { pageNumber, thread, postsData, sort, relatedPost } = this;

			this.loading = true;

			let data = {
				"filter[isApproved]": 1,
				"filter[isDeleted]": "no",
				"filter[isComment]": "no",
				"page[number]": pageNumber,
				"filter[thread]": thread.id,

				sort,
			};

			/**
			 *关联回复
			 */
			if (relatedPost) {
				data["filter[reply]"] = relatedPost.id;
				data["filter[isComment]"] = "yes";
			}

			const rs = await postsAPI.getThreadPosts(data);

			this.loading = false;

			if (rs) {
				this.meta = rs.meta;
				if (!postsData) {
					this.postsData = rs;
					return;
				}

				this.postsData = {
					data: [...postsData.data, ...rs.data],
					included: [...postsData.included, ...rs.included],
				};
			}
		},
	},
	components: {
		PostCard,
		NoPosts,
		PostsFilter,
		Editor,
	},
};
</script>

<style>
</style>