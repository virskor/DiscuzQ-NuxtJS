<template>
	<v-toolbar flat dense>
		<v-btn-toggle v-model="toggle_exclusive" group dense multiple>
			<v-btn @click="toolbarEvent('upload_image')">
				<v-icon>mdi-image-area</v-icon>
			</v-btn>

			<v-btn @click="toolbarEvent('add_emoji')">
				<v-icon>mdi-emoticon-happy</v-icon>
			</v-btn>

			<v-btn @click="toolbarEvent('upload_video')">
				<v-icon>mdi-message-video</v-icon>
			</v-btn>
		</v-btn-toggle>
		<v-spacer></v-spacer>

		<!-- <v-btn @click="toolbarEvent('full_screen')" text>
			<v-icon>mdi-crop-free</v-icon>
		</v-btn> -->

		<v-btn @click="pub" depressed rounded color="primary">发布</v-btn>
	</v-toolbar>
</template>

<script>
export default {
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
			this.$emit('pub');
		},
		toolbarEvent(action){
			const {toggle_exclusive} = this;
			this.$emit('action', action);
		}
	},
};
</script>

<style>
</style>