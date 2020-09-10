<template>
	<div>
		<v-btn @click="pick" class="ma-4" depressed>
			<v-icon left>mdi-plus</v-icon>添加
		</v-btn>
		<input hidden @change="upload" name="file" :accept="accept" id="file-picker" type="file" />
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

			if (uploadType == uploadTypes.UPLOAD_TYPE_THREAD_VIDEO) {
				return "video/*";
			}

			if (uploadType == uploadTypes.UPLOAD_TYPE_THREAD_ATTACHMENT) {
				return set_attach.support_file_ext;
			}

			if (
				uploadType == uploadTypes.UPLOAD_TYPE_THREAD_IMAGES ||
				uploadType == uploadTypes.UPLOAD_TYPE_MESSAGE_IMAGES
			) {
				return set_attach.support_img_ext;
			}

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
		},
	},
};
</script>

<style>
</style>