<template>
	<client-only>
		<div>
			<div id="DiscuzQEditor"></div>
			<!--编辑器工具栏-->
			<EditorToolbar></EditorToolbar>
		</div>
	</client-only>
</template>

<script>
/**
 * 该编辑器直接嵌入的话，会不限定高度宽度
 * 注意，嵌入编辑器时要自定义盒子来引入该组件，可以使dialog，也可以是普通的DIV
 *
 * https://github.com/sparksuite/simplemde-markdown-editor
 */
import EditorToolbar from "~/components/editor/EditorToolbar";

export default {
	name: "Editor",
	mounted() {
		this.$nextTick(async () => {
			this.initEditor();
		});
	},
	methods: {
		/**
		 * 初始化编辑器
		 */
		async initEditor() {},
	},
	components: {
		EditorToolbar,
	},
};
</script>

<style>
</style>