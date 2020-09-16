<template>
	<div class="pa-3">
		<v-divider></v-divider>
	</div>
</template>

<script>
/**
 * 该组件仅用于预览非图片的附件
 */
export default {
	props: {
		/**
		 * 用来预览的附件
		 */
		attachment: Object,
	},
};
</script>

<style>
</style>