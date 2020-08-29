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
	props: {
		/**
		 * 精简模式将不支持输入标题，等，适用于快速发帖，回复嵌入
		 */
		lightMode: Boolean,
		/**
		 * 是否是回复帖子,
		 * 回复帖子时，非lightMode也不会显示标题框，其次需要传入关联的Post, thread
		 */
		isReply: Boolean,
		/**
		 * 回复时，关联post, 将补全replyId
		 */
		post: Object,
		/**
		 * 回复时，关联thread
		 */
		thread: Object

	},
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