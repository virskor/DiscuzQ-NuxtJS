<template>
	<div>
		<v-text-field class="ma-3" v-if="!lightMode" label="标题" placeholder="请输入主题的标题"></v-text-field>

		<div id="quill-editor" class="quill-editor"></div>

		<!--编辑器工具栏-->
		<EditorToolbar
			:allowPrice="!isReply"
			:allowVideo="!isReply"
			:showAdvancedButton="lightMode && !isReply"
			@action="toolbarAction"
			@pub="pub"
		></EditorToolbar>
	</div>
</template>

<script>
import EditorToolbar from "~/components/editor/EditorToolbar";

export default {
	props: {
		value: String,
		/**
		 * 精简模式将不支持输入标题，等，适用于快速发帖，回复嵌入
		 */
		lightMode: Boolean,
		/**
		 * 是否是回复模式
		 */
		isReply: Boolean
	},
	mounted() {
		this.$nextTick(async () => {
			this.initEditor();
		});
	},
	data() {
		return {
			quillEditor: null,
			option: {
				placeholder: "输入要编辑的内容",
				readOnly: false,
				theme: "snow",
				modules: {
					toolbar: false,
				},
			},
		};
	},
	methods: {
		/**
		 * 初始化编辑器
		 */
		initEditor() {
			const { option } = this;
			if (!process.client) {
				return;
			}

			const Quill = require("quill");
			this.quillEditor = new Quill("#quill-editor", option);
		},
		/**
		 * 工具栏点击事件
		 */
		toolbarAction(action) {
			/**
			 * 处理用户点击全屏
			 */
			if (action == "fullscreen") {
				return;
			}

			this.$swal("即将支持");
		},
		/**
		 * 发布
		 * 仅当用户点击pub按钮后才进行input事件传递
		 */
		pub() {
			const { quillEditor } = this;
			this.$emit("input", quillEditor.getText());
		},
	},
	components: {
		EditorToolbar,
	},
};
</script>

<style lang="less">
#quill-editor {
	min-height: 100px;
}
.ql-container.ql-snow,
.ql-toolbar.ql-snow {
	border: none;
}
</style>