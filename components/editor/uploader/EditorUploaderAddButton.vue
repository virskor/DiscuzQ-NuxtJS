<template>
	<div>
		<v-btn rounded color="primary" @click="pick" class="mt-4" :loading="loading" depressed>
			<v-icon left>mdi-plus</v-icon>{{label || '添加'}}
		</v-btn>
		<input hidden @input="upload" name="file" :accept="accept" :id="inputID" type="file" />
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
		/**
		 * 标签
		 */
		label: String
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
			const setAttach = forum.attributes.set_attach;

			/**
			 * 限制仅允许的图片类型
			 */
			if(uploadType == uploadTypes.UPLOAD_TYPE_THREAD_ATTACHMENT){
				const support_file_ext = setAttach.support_file_ext;
				return support_file_ext.split(',').map(it => `.${it}`);
			}

			/**
			 * 限制仅允许的附件类型
			 */
			const support_img_ext = setAttach.support_img_ext;
			return support_img_ext.split(',').map(it => `.${it}`);
		},
		inputID(){
			const {uploadType} = this;
			return `file-picker-${uploadType}`;
		}
	},
	methods: {
		/**
		 * 选取文件
		 */
		pick() {
			const {inputID} = this;
			const file = document.getElementById(inputID);
			file.click();
		},

		/**
		 * 上传
		 */
		async upload(file) {
			const { uploadType, forum } = this;
			const setAttach = forum.attributes.set_attach;
			const supportMaxSize = setAttach.support_max_size * 1024;

			/**
			 * 要上传的文件和大小
			 */
			const uploadFile = file.srcElement.files[0];
			const uploadFileSize = uploadFile.size / 1024;

			/**
			 * 检测文件大小
			 */
			if( uploadFileSize > supportMaxSize){
				this.$swal(`文件不得超过${supportMaxSize}/Kb`);
				return;
			}

			this.loading = true;

			let formData = new FormData();
			formData.append("file", uploadFile);
			formData.append("type", uploadType);

			const rs = await attachmentsAPI.upload(formData);
			this.loading = false;

			if (rs) {
				await this.$store.dispatch('addAttachment', rs.data);
			}
		},
	},
};
</script>

<style>
</style>