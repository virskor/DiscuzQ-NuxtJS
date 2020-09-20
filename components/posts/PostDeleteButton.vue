<template>
	<v-btn v-if="canDelete && isButton" @click="deletePost" depressed text color="red">删除评论</v-btn>
	<v-list-item v-else-if="canDelete" @click="deletePost">
		<v-list-item-title>删除评论</v-list-item-title>
	</v-list-item>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import postsAPI from "~/api/posts";

export default {
	props: {
		/**
		 * 评论
		 */
		post: Object,
		/**
		 * 是否使用按钮样式
		 */
		isButton: Boolean,
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		// canDelete(){
		//     const {post} = this;
		//     if(!post){
		//         return false;
		//     }

		//     return post.attributes.canDelete;
		// }
		/**
		 * 后端接口反馈数据有误，前端先自行判断
		 * todo: 使用后端返回数据
		 */
		canDelete() {
			const { post, user } = this;
			if (!post || !user) {
				return false;
			}

			const relatedUserID = post.relationships.user.data.id;
			return user.id == relatedUserID;
		},
	},
	methods: {
		/**
		 * 删除评论
		 */
		async deletePost() {
			const willDelete = await this.$swal({
				title: "确定删除吗?",
				text: "删除后，这个评论无法恢复",
				icon: "info",
				buttons: {
					cancel: "取消",
					catch: {
						text: "确定",
					},
				},
				dangerMode: true,
			});

			if (willDelete) {
				const { post } = this;
				const rs = await postsAPI.delete(post.id);
				if (rs) {
					this.$emit("delete", true);
				}
			}
		},
	},
};
</script>

<style>
</style>