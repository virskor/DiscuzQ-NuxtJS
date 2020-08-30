<template>
	<v-toolbar class="editor-toolbar" flat dense>
		<div class="format-items">
			<!--粗体-->
			<!-- <v-btn
				v-if="!showAdvancedButton"
				:color="bold ? 'primary' :''"
				icon
				:ripple="false"
				@click="toolbarEvent('format_bold')"
			>
				<v-icon>mdi-format-bold</v-icon>
			</v-btn>

			<v-btn
				v-if="!showAdvancedButton"
				:color="italic ? 'primary' :''"
				icon
				:ripple="false"
				@click="toolbarEvent('format_italic')"
			>
				<v-icon>mdi-format-italic</v-icon>
			</v-btn>

			<v-btn
				v-if="!showAdvancedButton"
				:color="underline ? 'primary' :''"
				icon
				:ripple="false"
				@click="toolbarEvent('format_underline')"
			>
				<v-icon>mdi-format-underline</v-icon>
			</v-btn> -->

			<v-btn :ripple="false" icon @click="toolbarEvent('add_emoji')">
				<v-icon>mdi-emoticon-happy</v-icon>
			</v-btn>

			<v-btn :ripple="false" icon @click="toolbarEvent('upload_image')">
				<v-icon>mdi-image-area</v-icon>
			</v-btn>

			<v-btn v-if="allowVideo" :ripple="false" icon @click="toolbarEvent('upload_video')">
				<v-icon>mdi-message-video</v-icon>
			</v-btn>

			<v-badge color="amber" :content="`需支付：${price}`" v-if="allowPrice">
				<v-btn :ripple="false" icon @click="toolbarEvent('set_price')">
					<v-icon>mdi-currency-usd</v-icon>
				</v-btn>
			</v-badge>
		</div>
		<v-spacer></v-spacer>

		<v-btn :ripple="false" v-if="showAdvancedButton" @click="$router.push('/views/editor')" text>高级</v-btn>
		
		<CategoriesSelectionList></CategoriesSelectionList>
		<v-btn @click="pub" depressed rounded color="primary">发布</v-btn>
	</v-toolbar>
</template>

<script>
import CategoriesSelectionList from "~/components/categories/CategoriesSelectionList";

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
		 * 显示高级模式
		 */
		showAdvancedButton: Boolean,
		/**
		 * 设置的价格
		 */
		price: String,
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
		};
	},
	methods: {
		/**
		 * 点击发布按钮
		 */
		pub() {
			this.$emit("pub");
		},
		toolbarEvent(type) {
			const { toggle_exclusive } = this;

			if (type == "format_bold") {
				this.bold = !this.bold;
				this.$emit("action", { type, value: this.bold });
				return;
			}

			if (type == "format_italic") {
				this.italic = !this.italic;
				this.$emit("action", { type, value: this.italic });
				return;
			}

			if (type == "format_underline") {
				this.underline = !this.underline;
				this.$emit("action", { type, value: this.underline });
				return;
			}

			this.$emit("action", { type });
		},
	},
	components:{
		CategoriesSelectionList
	}
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