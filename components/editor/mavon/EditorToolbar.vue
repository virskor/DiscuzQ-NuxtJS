<template>
	<v-toolbar class="editor-toolbar" flat dense>
		<div class="format-items">

			<v-menu v-model="showEmojis" :close-on-content-click="false" :nudge-width="200" offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn :ripple="false" v-bind="attrs" v-on="on" icon>
						<v-icon>mdi-emoticon-happy</v-icon>
					</v-btn>
				</template>

				<EditorEmojiList @close="showEmojis = false" @input="emojiSelection"></EditorEmojiList>
			</v-menu>

			<!-- <v-btn v-if="allowVideo" :ripple="false" icon>
				<v-icon>mdi-message-video</v-icon>
			</v-btn> -->

			<v-btn :ripple="false" icon @click="toolbarEvent('set_price')">
				<v-icon>mdi-currency-usd</v-icon>
			</v-btn>

			<v-chip color="amber" v-if="allowPrice && price > 0" label>{{`需支付：${price}`}}</v-chip>
		</div>
		<v-spacer></v-spacer>

		<v-btn :ripple="false" v-if="showAdvancedButton" @click="$router.push('/views/editor')" text>高级</v-btn>

		<!--分类选择-->
		<CategoriesSelectionList @category="(c) => $emit('category', c)" v-if="!isReply"></CategoriesSelectionList>

		<v-btn @click="pub" depressed rounded color="primary">{{saveButtonCaption}}</v-btn>
	</v-toolbar>
</template>

<script>
import CategoriesSelectionList from "~/components/categories/CategoriesSelectionList";
import EditorEmojiList from "~/components/editor/mavon/EditorEmojiList";

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
		};
	},
	computed: {
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
	},
	components: {
		CategoriesSelectionList,
		EditorEmojiList,
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