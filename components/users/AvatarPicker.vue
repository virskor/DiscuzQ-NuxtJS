<template>
	<div @click="pick">
		<Avatar preventClick :user="user" :size="size"></Avatar>
		<input hidden @change="upload" name="avatar" accept="image/*" id="avatar-picker" type="file" />
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

/**
 * 头像上传组件
 */
import Avatar from "~/components/users/Avatar";
import attachmentsAPI from "~/api/attachments";

export default {
	props: {
		/**
		 * 头像大小
		 */
		size: Number,
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
	},
	methods: {
		/**
		 * 选取头像
		 */
		pick() {
			const image = document.getElementById("avatar-picker");
			image.click();
		},

		/**
		 * 上传头像
		 */
		async upload(file) {
			const {user} = this;
			let formData = new FormData();
			// let image = document.getElementById("avatar-picker");
			// formData.append("avatar", image.files[0]);
			formData.append("avatar", file.srcElement.files[0]);
			const rs = await attachmentsAPI.uploadAvatar(user, formData);
			if(rs){
				await this.$store.dispatch('updateCurrentUser', rs.data);
				await this.$swal("上传成功!", "您的头像上传成功", "success");
			}
		},
	},
	components: {
		Avatar,
	},
};
</script>

<style>
</style>