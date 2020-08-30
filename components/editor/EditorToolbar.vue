<template>
	<v-toolbar flat dense>
		<v-btn-toggle v-model="toggle_exclusive" group dense multiple>
			<v-btn @click="toolbarEvent('upload_image')">
				<v-icon>mdi-image-area</v-icon>
			</v-btn>

			<v-btn @click="toolbarEvent('add_emoji')">
				<v-icon>mdi-emoticon-happy</v-icon>
			</v-btn>

			<v-btn v-if="allowVideo" @click="toolbarEvent('upload_video')">
				<v-icon>mdi-message-video</v-icon>
			</v-btn>

			<v-btn v-if="allowPrice" @click="toolbarEvent('set_price')">
				<v-icon>mdi-currency-usd</v-icon>
			</v-btn>
		</v-btn-toggle>
		<v-spacer></v-spacer>

		<v-btn v-if="showAdvancedButton" @click="$router.push('/views/editor')" text>高级</v-btn>

		<v-btn @click="pub" depressed rounded color="primary">发布</v-btn>
	</v-toolbar>
</template>

<script>
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
		showAdvancedButton: Boolean
	},
	data() {
		return {
			toggle_exclusive: [],
		};
	},
	methods: {
		/**
		 * 点击发布按钮
		 */
		pub() {
			this.$emit("pub");
		},
		toolbarEvent(action) {
			const { toggle_exclusive } = this;
			this.$emit("action", action);
		},
	},
};
</script>

<style>
</style>