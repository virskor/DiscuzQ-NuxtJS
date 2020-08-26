<template>
	<div>
		<!--渲染评论列表-->
		<template v-if="!$_.isEmpty(posts)">
			<template v-for="(post, i) in posts">
				<var-box :user="mapPostUser(post.relationships.user.data.id)" :key="i" v-slot="{ user }">
					<PostCard v-if="user" :post="post" :user="user" :key="i"></PostCard>
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
import postAPI from "~/api/post";

export default {
	props: {
		/**
		 * 主题模型
		 */
		thread: Object,
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
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.loadMorePosts();
		});
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
		 * load more posts
		 */
		async loadMorePosts() {
			const { pageNumber, thread, postsData } = this;

			this.loading = true;

			const data = {
				"filter[isApproved]": 1,
				"filter[isDeleted]": "no",
				"filter[isComment]": "no",
				"page[number]": pageNumber,
				"filter[thread]": thread.id,
				sort: "createdAt",
			};
			const rs = await postAPI.getThreadPosts(data);

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
	},
};
</script>

<style>
</style>