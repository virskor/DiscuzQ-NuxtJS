<template>
	<div class="markdown-editor">
		<v-text-field
			class="mt-3 ml-3 mr-3"
			@input="setTitle"
			:value="editor.title"
			v-if="!lightMode"
			label="标题"
			placeholder="请输入帖子的标题(可选)"
		></v-text-field>

		<mavon-editor
			ref="md"
			:subfield="!lightMode"
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
			@category="(c) => $emit('category', c)"
			@pub="pub"
			:enableAttachment="enableAttachment"
			:enablePrice="enablePrice"
		></EditorToolbar>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";
import EditorToolbar from "~/components/editor/mavon/EditorToolbar";

export default {
	props: {
		/**
		 * 精简模式将不支持输入标题，等，适用于快速发帖，回复嵌入
		 */
		lightMode: Boolean,
		/**
		 * 是否是回复模式
		 */
		isReply: Boolean,
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
	mounted() {
		this.$nextTick(async () => {
			this.appendToolbarItems();
		});
	},
	computed: {
		...mapGetters({
			editor: types.GETTERS_EDITOR,
		}),
		/**
		 * 启用工具栏
		 */
		toolbarsFlag() {
			const { isReply, lightMode } = this;
			if (isReply) {
				return true;
			}

			return lightMode ? false : true;
		},
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
				fullscreen: false, // 全屏编辑
				readmodel: false, // 沉浸式阅读
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
		 * 拓转mavon editor toolbar 选项
		 */
		appendToolbarItems() {
			const { toolbarsFlag } = this;
			if (!toolbarsFlag) {
				return;
			}
		},
		/**
		 * 工具栏点击事件
		 */
		async toolbarAction(action) {
			/**
			 * 添加表情
			 */
			if (action.type == "add_emoji") {
				const { markdown } = this;
				const emoji = action.value;

				this.markdown = markdown + ` ${emoji.attributes.code} `;
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
		async pub() {
			const { markdown } = this;
			await this.$store.dispatch("updateContent", markdown);
			this.$emit("pub");
		},
		/**
		 * 设置标题
		 */
		async setTitle(val) {
			await this.$store.dispatch("updateTitle", val);
		},
	},
	watch: {
		editor: {
			/**
			 * 目的是为了实现编辑器发布后，editor状态中的content被清空时需要重构编辑器视图
			 */
			handler(newEditor) {
				const {markdown} = this;
				if(!this.$_.isEmpty(newEditor.content)){
					return;
				}

				if(this.$_.isEmpty(markdown)){
					return;
				}
				
				this.markdown = '';
			},
			deep: true
		},
	},

	components: {
		EditorToolbar,
	},
};
</script>

<style lang="less">
.markdown-editor {
	.v-note-wrapper {
		min-height: 100px !important;
		border-radius: 0;
	}
}
</style>