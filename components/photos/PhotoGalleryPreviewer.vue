<template>
	<div class="text-center">
		<v-btn color="error" @click="overlay = !overlay">Show Overlay</v-btn>

		<v-overlay :value="overlay">
			<v-btn icon @click="overlay = false">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-overlay>
	</div>
</template>
<script>
export default {
	props: {
		/**
		 * 图集图片地址数组
		 */
		images: Array,
	},
	data() {
		return {
			overlay: true,
		};
	},
};
</script>

<style>
</style>