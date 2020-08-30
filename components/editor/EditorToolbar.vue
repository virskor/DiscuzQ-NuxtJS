<template>
	<v-toolbar flat dense>
		<v-btn-toggle v-model="toggle_exclusive" group dense multiple>
			<v-btn @click="toolbarEvent">
				<v-icon>mdi-format-bold</v-icon>
			</v-btn>

			<v-btn @click="toolbarEvent">
				<v-icon>mdi-format-italic</v-icon>
			</v-btn>

			<v-btn @click="toolbarEvent">
				<v-icon>mdi-format-underline</v-icon>
			</v-btn>

			<v-btn @click="toolbarEvent">
				<v-icon>mdi-image-area</v-icon>
			</v-btn>

			<v-btn @click="toolbarEvent">
				<v-icon>mdi-emoticon-happy</v-icon>
			</v-btn>

			<v-btn @click="toolbarEvent">
				<v-icon>mdi-message-video</v-icon>
			</v-btn>
		</v-btn-toggle>
		<v-spacer></v-spacer>
		<v-btn text>
			<v-icon>mdi-crop-free</v-icon>
		</v-btn>
		<v-btn @click="publish" depressed rounded color="primary">发布</v-btn>
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
		publish() {
			this.$swal("即将支持");
		},
		toolbarEvent(){
			const {toggle_exclusive} = this;
			this.$swal("即将支持");
			console.log(toggle_exclusive);
		}
	},
};
</script>

<style>
</style>