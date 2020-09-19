<template>
	<div class="pa-3">
		<v-divider></v-divider>
		<v-toolbar-title class="mt-3">{{uploadTypeCaption}}</v-toolbar-title>
		<!--预览已经上传的附件 仅上传为图片时-->
		<AttachmentImages
			v-if="uploadType == uploadTypes.UPLOAD_TYPE_THREAD_IMAGES"
			class="mt-4"
			unLimited
			canRemove
			grid
			@del-attachments="removeAttachment"
			:attachments="attachments"
		></AttachmentImages>

		<EditorUploaderAddButton :label="`添加${uploadTypeCaption}`" :uploadType="type"></EditorUploaderAddButton>

		<div class="mt-3">温馨提示：上传的{{uploadTypeCaption}}不应该涉及违规，版权争议等违反用户协议的内容，否则将承担法律责任。</div>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

/// attachments
/// del-attachments
import attachmentsAPI from "~/api/attachments";
import EditorUploaderAddButton from "~/components/editor/uploader/EditorUploaderAddButton";
import AttachmentImages from "~/components/attachments/AttachmentImages";

export default {
	props: {
		/**
		 * attachmentsAPI 上传类型
		 * 默认为： attachmentsAPI.UPLOAD_TYPE_THREAD_IMAGES
		 */
		uploadType: Number,
		/**
		 * single
		 * 仅允许单个
		 */
		single: Boolean,
	},
	data() {
		return {
			/**
			 * 上传类型
			 *
			 * 根据上传类型显示的方式不同，分为上传附件
			 */
			type: attachmentsAPI.types.UPLOAD_TYPE_THREAD_IMAGES,

			/**
			 * 上传类型
			 */
			uploadTypes: attachmentsAPI.types,
		};
	},
	computed: {
		...mapGetters({
			editor: types.GETTERS_EDITOR,
		}),
		/**
		 * 仅筛选图片用于预览
		 */
		attachments() {
			const { editor, type } = this;
			const attachments = editor.attachments;
			return attachments.filter(
				(el) =>
					el.attributes.type == type
			);
		},
		/**
		/**
		 * 上传类型标签
		 */
		uploadTypeCaption() {
			const { type, uploadTypes } = this;

			let caption;
			switch (type) {
				case uploadTypes.UPLOAD_TYPE_THREAD_ATTACHMENT:
					caption = "帖子附件";
					break;

				case uploadTypes.UPLOAD_TYPE_THREAD_IMAGES:
					caption = "帖子图片";
					break;

				case uploadTypes.UPLOAD_TYPE_THREAD_VOICES:
					caption = "帖子音频";
					break;

				case uploadTypes.UPLOAD_TYPE_THREAD_VIDEO:
					caption = "帖子视频";
					break;

				case uploadTypes.UPLOAD_TYPE_MESSAGE_IMAGES:
					caption = "消息图片";
					break;

				default:
					caption = "附件";
					break;
			}

			return caption;
		},
	},
	mounted() {
		this.$nextTick(() => {
			const { uploadType } = this;
			if (!this.$_.isEmpty(uploadType)) {
				this.type = uploadType;
			}
		});
	},
	methods: {
		/**
		 * 移除附件
		 */
		async removeAttachment(a) {
			await this.$store.dispatch("removeAttachment", a);
		},
	},
	components: {
		EditorUploaderAddButton,
		AttachmentImages,
	},
};
</script>

<style>
</style>