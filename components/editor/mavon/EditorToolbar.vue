<template>
	<div class="editor-toolbar">
		<v-container fluid grid-list-md>
			<v-layout row wrap>
				<v-flex pl-2 md12 lg6>
					<div class="format-items">
						<v-menu v-model="showEmojis" :close-on-content-click="false" :nudge-width="200" offset-y>
							<template v-slot:activator="{ on, attrs }">
								<v-btn :ripple="false" v-bind="attrs" v-on="on" icon>
									<v-icon>mdi-emoticon-happy</v-icon>
								</v-btn>
							</template>

							<EditorEmojiList @close="showEmojis = false" @input="emojiSelection"></EditorEmojiList>
						</v-menu>

						<!--图片上传-->
						<v-btn
							@click="wantUploadFiles(true)"
							:color="showEditorImagesUploader ? 'primary' : ''"
							:ripple="false"
							icon
						>
							<v-icon>mdi-image-area</v-icon>
						</v-btn>

						<!--附件上传-->
						<v-btn
							v-if="enableAttachment"
							@click="wantUploadFiles(false)"
							:color="showAttachmentsUploader ? 'primary' : ''"
							:ripple="false"
							icon
						>
							<v-icon>mdi-attachment</v-icon>
						</v-btn>

						<!-- <v-btn v-if="allowVideo" :ripple="false" icon>
				<v-icon>mdi-message-video</v-icon>
						</v-btn>-->

						<v-btn v-if="enablePrice" :ripple="false" icon @click="toolbarEvent('set_price')">
							<v-icon>mdi-currency-usd</v-icon>
						</v-btn>

						<v-chip color="amber" v-if="allowPrice && price > 0" label>{{`需支付：${price}`}}</v-chip>
					</div>
				</v-flex>
				<v-flex md-12 lg6>
					<v-row justify="end">
						<v-btn
							:ripple="false"
							v-if="showAdvancedButton"
							@click="$router.push('/views/editor')"
							text
						>高级</v-btn>

						<!--分类选择-->
						<CategoriesSelectionList @category="(c) => $emit('category', c)" v-if="!isReply"></CategoriesSelectionList>

						<v-btn @click="pub" depressed rounded color="primary">{{saveButtonCaption}}</v-btn>
					</v-row>
				</v-flex>
			</v-layout>
		</v-container>

		<EditorImagesUploader
			:uploadType="uploadTypes.UPLOAD_TYPE_THREAD_IMAGES"
			v-show="showEditorImagesUploader"
		></EditorImagesUploader>

		<EditorAttachmentsUploader
			:uploadType="uploadTypes.UPLOAD_TYPE_THREAD_IMAGES"
			v-show="showAttachmentsUploader"
		></EditorAttachmentsUploader>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import CategoriesSelectionList from "~/components/categories/CategoriesSelectionList";
import EditorEmojiList from "~/components/editor/mavon/EditorEmojiList";
import EditorImagesUploader from "~/components/editor/uploader/EditorImagesUploader";
import EditorAttachmentsUploader from "~/components/editor/uploader/EditorAttachmentsUploader";
import attachmentsAPI from "~/api/attachments";

export default {
	props: {
		/**
		 * 允许发布视频
		 */
		allowVideo: Boolean,
		/**
		 * 允许设置价格
		 */
		allowPrice: Boolean,
		/**
		 * 设置的价格
		 */
		price: String,
		/**
		 * 是否是回复模式
		 */
		isReply: Boolean,
		/**
		 * 精简模式将不支持输入标题，等，适用于快速发帖，回复嵌入
		 */
		lightMode: Boolean,
		/**
		 * enable upload attachment
		 * 是否允许上传附件
		 */
		enableAttachment: Boolean,
		/**
		 * 是否允许设置价格
		 */
		enablePrice: Boolean
	},
	data() {
		return {
			toggle_exclusive: [],

			/**
			 * 要发布到的分类
			 */
			category: null,
			/**
			 * bold
			 */
			bold: false,
			/**
			 * italic
			 */
			italic: false,
			/**
			 * underline
			 */
			underline: false,
			/**
			 * show emoji
			 */
			showEmojis: false,
			/**
			 * show EditorImagesUploader
			 */
			showEditorImagesUploader: false,

			/**
			 * 显示上传附件
			 */
			showAttachmentsUploader: false,

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
		 * 附件
		 */
		attachments() {
			const { editor, type } = this;
			const attachments = editor.attachments;
			return attachments;
		},
		/**
		 * 是否显示高级选项
		 */
		showAdvancedButton() {
			const { isReply, lightMode } = this;
			if (isReply) {
				return false;
			}

			return lightMode ? true : false;
		},
		/**
		 * saveButtonCaption
		 */
		saveButtonCaption() {
			const { isReply, lightMode } = this;
			if (isReply) {
				return "回复";
			}

			return lightMode ? "发动态" : "发帖";
		},
	},
	methods: {
		/**
		 * 点击发布按钮
		 */
		pub() {
			this.$emit("pub");
		},
		/**
		 * 工具栏事件
		 */
		toolbarEvent(type) {
			const { toggle_exclusive } = this;
			this.$emit("action", { type });
		},
		/**
		 * 选中表情
		 */
		emojiSelection(e) {
			this.$emit("action", { type: "add_emoji", value: e });
		},
		/**
		 * want upload files
		 * 如果上传图片，则不能上传附件
		 * 如果上传附件，则不能上传图片
		 */
		wantUploadFiles(isImage) {
			const { attachments, uploadTypes } = this;

			if (isImage) {
				const { showEditorImagesUploader } = this;
				this.showEditorImagesUploader = !showEditorImagesUploader;
				this.showAttachmentsUploader = false;
				return;
			}

			const { showAttachmentsUploader } = this;
			this.showAttachmentsUploader = !showAttachmentsUploader;
			this.showEditorImagesUploader = false;
		},
	},
	components: {
		CategoriesSelectionList,
		EditorEmojiList,
		EditorImagesUploader,
		EditorAttachmentsUploader,
	},
};
</script>

<style lang="less">
.editor-toolbar {
	.format-items {
		overflow: scroll;
		display: contents;
	}
}
</style>