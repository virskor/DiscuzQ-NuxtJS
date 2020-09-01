<template>
	<div class="markdown-editor">
		<v-text-field class="mt-3 ml-3 mr-3" @input="setTitle" v-if="!lightMode" label="标题" placeholder="请输入帖子的标题(可选)"></v-text-field>

		<mavon-editor
		ref='md'
			:subfield="false"
			:toolbars="toolbars"
			:boxShadow="false"
			v-model="markdown"
			:toolbarsFlag="toolbarsFlag"
			:ishljs="true"
		/>

		<!--编辑器工具栏-->
		<EditorToolbar
			:allowPrice="!isReply"
			:allowVideo="!isReply"
			:isReply="isReply"
			:lightMode="lightMode"
			:price="price"
			@action="toolbarAction"
			@pub="pub"
		></EditorToolbar>
	</div>
</template>

<script>
import EditorToolbar from "~/components/editor/mavon/EditorToolbar";

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
		isReply: Boolean,
	},
	mounted() {
		this.$nextTick(async () => {});
	},
	computed: {
		/**
		 * 启用工具栏
		 */
		toolbarsFlag(){
			const {isReply, lightMode} = this;
			if(isReply){
				return true;
			}

			return lightMode ? false : true;
		}
	},
	data() {
		return {
			markdown: "",
			price: "0.00",
			toolbars: {
				bold: true, // 粗体
				italic: true, // 斜体
				header: true, // 标题
				underline: true, // 下划线
				strikethrough: true, // 中划线
				mark: true, // 标记
				superscript: true, // 上角标
				subscript: true, // 下角标
				quote: true, // 引用
				ol: true, // 有序列表
				ul: true, // 无序列表
				link: true, // 链接
				imagelink: false, // 图片链接
				code: true, // code
				table: true, // 表格
				fullscreen: true, // 全屏编辑
				readmodel: true, // 沉浸式阅读
				htmlcode: true, // 展示html源码
				help: true, // 帮助
				/* 1.3.5 */
				undo: true, // 上一步
				redo: true, // 下一步
				trash: true, // 清空
				save: false, // 保存（触发events中的save事件）
				/* 1.4.2 */
				navigation: false, // 导航目录
				/* 2.1.8 */
				alignleft: true, // 左对齐
				aligncenter: true, // 居中
				alignright: true, // 右对齐
				/* 2.2.1 */
				subfield: true, // 单双栏模式
				preview: true, // 预览
			},
		};
	},
	methods: {
		/**
		 * 工具栏点击事件
		 */
		async toolbarAction(action) {
			/**
			 * 处理用户点击全屏
			 */
			if (action.type == "fullscreen") {
				return;
			}

			if (action.type == "format_bold") {
				return;
			}

			if (action.type == "format_italic") {
				return;
			}

			if (action.type == "format_underline") {
				return;
			}

			if (action.type == "add_emoji") {
				const emoji = action.value;
				return;
			}

			/**
			 * 设置价格
			 */
			if (action.type == "set_price") {
				const { price } = this;
				const value = await this.$swal("请输入帖子的价格", {
					content: {
						element: "input",
						attributes: {
							value: price,
						},
					},
				});

				if (this.$C.formatAmounts(value) > 0) {
					const formatPrice = this.$C.formatAmounts(value);
					this.price = formatPrice;
					this.$emit("price", formatPrice);
					return;
				}

				this.price = 0;
				return;
			}

			this.$swal("即将支持");
		},
		/**
		 * 发布
		 * 仅当用户点击pub按钮后才进行input事件传递
		 */
		pub() {
			const {markdown} = this;
			this.$emit('input', markdown);
		},
		/**
		 * 设置标题
		 */
		setTitle(val) {
			this.$emit("title", val);
		},
	},
	components: {
		EditorToolbar,
	},
};
</script>

<style lang="less">
.markdown-editor{
	.v-note-wrapper{
		min-height: 100px !important;
	}
}
</style>