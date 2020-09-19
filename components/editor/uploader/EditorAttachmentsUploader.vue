<template>
	<div class="pa-3">
		<v-divider></v-divider>
		<v-toolbar-title class="mt-3">帖子附件</v-toolbar-title>
		<v-row class="pa-3">
			<template v-for="(a, i) in attachments">
				<ThreadAttchmentsFileIcon class="mr-2 mb-2" @del-attachments="removeAttachment" :key="i" :attachment="a"></ThreadAttchmentsFileIcon>
			</template>
		</v-row>
		<EditorUploaderAddButton label="添加附件" :uploadType="type"></EditorUploaderAddButton>

		<div class="mt-3">温馨提示：上传的文件不应该涉及违规，版权争议等违反用户协议的内容，否则将承担法律责任。</div>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import attachmentsAPI from "~/api/attachments";
import EditorUploaderAddButton from "~/components/editor/uploader/EditorUploaderAddButton";
import ThreadAttchmentsFileIcon from "~/components/attachments/ThreadAttchmentsFileIcon";

/**
 * 该组件仅用于预览非图片的附件
 */
export default {
	props: {
		/**
		 * attachmentsAPI 上传类型
		 * 默认为： attachmentsAPI.UPLOAD_TYPE_THREAD_IMAGES
		 */
		uploadType: Number,
	},
	data() {
		return {
			/**
			 * 上传类型
			 *
			 * 根据上传类型显示的方式不同，分为上传附件
			 */
			type: attachmentsAPI.types.UPLOAD_TYPE_THREAD_ATTACHMENT,

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
		 * 仅筛选附件用于预览
		 */
		attachments() {
			const { editor, type } = this;
			const attachments = editor.attachments;
			return attachments.filter((el) => el.attributes.type == type);
		},
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
		ThreadAttchmentsFileIcon
	},
};
</script>

<style>
</style>