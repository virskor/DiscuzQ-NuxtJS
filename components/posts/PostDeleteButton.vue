<template>
	<v-btn v-if="canDelete" @click="deletePost" text color="red">删除</v-btn>
</template>

<script>
import postsAPI from "~/api/posts";

export default {
	props: {
		/**
		 * 评论
		 */
		post: Object,
    },
    computed: {
        canDelete(){
            const {post} = this;
            if(!post){
                return false;
            }

            return post.attributes.canDelete;
        }
    },
	methods: {
		/**
		 * 删除评论
		 */
		async deletePost() {
			const willDelete = await this.$swal({
				title: "确定删除吗?",
				text:
					"删除后，这个评论无法恢复",
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