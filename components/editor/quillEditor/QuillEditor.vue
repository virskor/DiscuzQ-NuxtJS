<template>
	<div>
		<v-text-field class="ma-3" @input="setTitle" v-if="!lightMode" label="标题" placeholder="请输入主题的标题"></v-text-field>

		<div id="quill-editor" class="quill-editor"></div>

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
import EditorToolbar from "~/components/editor/quillEditor/EditorToolbar";
import EditorContentFormater from "~/components/editor/quillEditor/EditorContentFormater";

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
			price: "0.00",
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

			if (this.quillEditor) {
				return;
			}

			const Quill = require("quill");
			this.quillEditor = new Quill("#quill-editor", option);

			/** inline blots */
			const Embed = Quill.import("blots/embed");
			class EmojiBlot extends Embed {
				static create(data) {
					const node = super.create(data);
					node.setAttribute("src", `${data.src}`);
					node.setAttribute("alt", `${data.alt}`);
					return node;
				}
				static value(domNode) {
					const { src, alt, custom } = domNode.dataset;
					return { src, alt, custom };
				}
			}

			/** inline blots for urlLik */

			/**
			 * register blots
			 */
			EmojiBlot.blotName = "emojiBlot";
			EmojiBlot.tagName = "img";
			Quill.register({ "formats/emojiBlot": EmojiBlot });
		},
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
				this.quillEditor.format("bold", action.value);
				return;
			}

			if (action.type == "format_italic") {
				this.quillEditor.format("italic", action.value);
				return;
			}

			if (action.type == "format_underline") {
				this.quillEditor.format("underline", action.value);
				return;
			}

			if (action.type == "add_emoji") {
				const emoji = action.value;
				this.quillEditor.insertEmbed(
					this.quillEditor.getLength() - 1,
					"emojiBlot",
					{ src: emoji.attributes.url, alt: emoji.attributes.code },
					"api"
				);
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

				await this.$swal("输入的价格无效");

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
			const { fromDelta } = require("delta-markdown-for-quill");
			try {
				const contents = quillEditor.getContents();
				const markdown = EditorContentFormater.formDelta(contents);
				console.log(markdown);

				this.$emit("input", markdown);
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * 设置标题
		 */
		setTitle(val){
			this.$emit('title', val);
		}
	},
	components: {
		EditorToolbar,
		EditorContentFormater
	},
};
</script>

<style lang="less">
#quill-editor {
	min-height: 100px;
	font-size: 16px;
	img {
		width: 25px;
	}
}
.ql-container.ql-snow,
.ql-toolbar.ql-snow {
	border: none;
}
</style>