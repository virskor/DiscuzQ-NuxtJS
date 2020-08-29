<template>
	<v-card :ripple="false" elevation="0" class="post-card pb-2 pt-2" tile :id="`post-${post.id}`">
		<!--评论header 用户信息和操作条-->
	
		<v-list-item>
			<v-list-item-avatar :size="50" title>
				<Avatar :user="user"></Avatar>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title  class="font-weight-black" v-text="user.attributes.username"></v-list-item-title>
				<v-list-item-subtitle>
					<span>发布于：{{$C.formatDateTime(post.attributes.createdAt)}}</span>
					<span></span>
				</v-list-item-subtitle>
			</v-list-item-content>

			<v-list-item-action>
				<!--赞-->
				<PostLikeButton :post="post"></PostLikeButton>
			</v-list-item-action>
		</v-list-item>
		<!--显示评论内容-->
		<PostContent :thread="thread" :post="post"></PostContent>
	</v-card>
</template>

<script>
import PostContent from "~/components/posts/PostCard";
import PostLikeButton from "~/components/posts/PostLikeButton";
import Avatar from "~/components/users/Avatar";

export default {
	props: {
		/**
		 * 评论模型
		 */
		post: Object,
		/**
		 * 用户模型
		 */
		user: Object,
		/**
		 * reply to user
		 * 回复给某个用户
		 */
		replyToUser: Object,
		/**
		 * 关联的主题
		 */
		thread: Object
	},
	components: {
		PostContent,
		Avatar,
		PostLikeButton
	},
};
</script>

<style lang="less">
.post-card {
	border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>