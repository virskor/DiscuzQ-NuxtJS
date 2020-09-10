<template>
	<div class="pa-3">
		<v-divider></v-divider>
		<v-row>
			<!--预览已经上传的附件-->
			<v-card v-for="(a, i) in attachments" :key="i">
				<EditorUploaderPreview @del-attachments="remove" :attachment="a"></EditorUploaderPreview>
			</v-card>

			<EditorUploaderAddButton :uploadType="type" @add="add"></EditorUploaderAddButton>
		</v-row>
		<div class="mt-3">温馨提示：上传的{{uploadTypeCaption}}不应该涉及违规，版权争议等违反用户协议的内容，否则将承担法律责任。</div>
	</div>
</template>

<script>
/// attachments
/// del-attachments
import attachmentsAPI from "~/api/attachments";
import EditorUploaderAddButton from "~/components/editor/uploader/EditorUploaderAddButton";
import EditorUploaderPreview from "~/components/editor/uploader/EditorUploaderPreview";

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
			attachments: [],
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
		 * 添加附件
		 */
		add(a) {
			if (this.$_.isEmpty(a)) {
				return;
			}

			this.attachments.push(a);
			this.$emit("attachments", a);
		},
		/**
		 * 移除附件
		 */
		remove(a) {},
	},
	components: {
		EditorUploaderAddButton,
		EditorUploaderPreview,
	},
};
</script>

<style>
</style>