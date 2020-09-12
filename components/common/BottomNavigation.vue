<template>
	<v-bottom-navigation grow app color="primary" class="hidden-lg-and-up">
		<v-btn @click="$emit('start')">
			<span>我的</span>
			<v-icon>mdi-account-outline</v-icon>
		</v-btn>
	</v-bottom-navigation>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style>
</style>