<template>
	<div>
		<div id="quill-editor" class="quill-editor" @change="onEditorChange($event)"></div>
		<!--编辑器工具栏-->
		<EditorToolbar></EditorToolbar>
	</div>
</template>

<script>
import EditorToolbar from "~/components/editor/EditorToolbar";

export default {
	props: {
		value: String,
	},
	mounted() {
		this.$nextTick(async () => {
			this.initEditor();
		});
	},
	data() {
		return {
            quillEditor: null,
			content: "",
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
         * 编辑器输入
         */
		onEditorChange({ editor, html, text }) {
			_.debounce(function () {
				this.$emit("input", text);
			}, 500);
		},
	},
	components: {
		EditorToolbar,
	},
};
</script>

<style lang="less">
#quill-editor{
    min-height: 100px;
}
.ql-container.ql-snow,
.ql-toolbar.ql-snow {
	border: none;
}
</style>