<template>
	<v-row no-gutters align="center" class="mr-2" justify="end">
		<v-btn :loading="loading" color="transparent" @click="toggleLikeButton" :ripple="false" depressed>
			<v-icon :color=" isLiked ? 'pink' : ''">mdi-heart-outline</v-icon>
			<span :class="isLiked ? 'pink--text' : ''">{{counts || post.attributes.likeCount || 0}}</span>
		</v-btn>
	</v-row>
</template>

<script>
import postsAPI from "~/api/posts";

export default {
	props: {
		/**
		 * 评论模型
		 */
		post: Object,
	},
	computed: {
		/**
		 * 是否已经点赞过
		 */
		isLiked() {
			const { post, like } = this;
			if (like !== null) {
				return like;
			}
			return post.attributes.isLiked || false;
		},
	},
	data() {
		return {
			/**
			 * like是指用户当前的操作，如果用户点击，那么显示的优先级最高
			 */
			like: null,
			counts: null /** 用于覆盖请求前的点赞统计 */,
			/**
             * 处理中
             */
            loading: false
		};
	},
	methods: {
		/**
		 * 反选喜欢按钮
		 */
		async toggleLikeButton() {
			const { post, isLiked } = this;
			this.loading = true;

			const rs = await postsAPI.like(post.id, !isLiked);

			this.loading = false;
			if (rs) {
				this.like = rs.data.attributes.isLiked;
				this.counts = rs.data.attributes.likeCount;
			}
		},
	},
};
</script>

<style>
</style>