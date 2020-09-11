<template>
	<div>
		<v-btn rounded color="primary" @click="pick" class="mt-4" :loading="loading" depressed>
			<v-icon left>mdi-plus</v-icon>添加
		</v-btn>
		<input hidden @input="upload" name="file" :accept="accept" id="file-picker" type="file" />
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import attachmentsAPI from "~/api/attachments";

export default {
	props: {
		/**
		 * 上传的类型
		 */
		uploadType: Number,
	},
	data() {
		return {
			/**
			 * 上传类型
			 */
			uploadTypes: attachmentsAPI.types,

			/** 上传中 */
			loading: false,
		};
	},
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
		}),
		accept() {
			const { uploadType, uploadTypes, forum } = this;
			const set_attach = forum.attributes.set_attach;

			return "image/*";
		},
	},
	methods: {
		/**
		 * 选取文件
		 */
		pick() {
			const file = document.getElementById("file-picker");
			file.click();
		},

		/**
		 * 上传
		 */
		async upload(file) {
			const { uploadType } = this;
			this.loading = true;

			let formData = new FormData();
			formData.append("file", file.srcElement.files[0]);
			formData.append("type", uploadType);

			const rs = await attachmentsAPI.upload(formData);
			this.loading = false;

			if (rs) {
				this.$emit("attachment", rs.data);
			}
		},
	},
};
</script>

<style>
</style>