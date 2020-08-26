<template>
	<div class="text-center mb-4 mt-4">
		<v-btn :loading="loading" @click="reward" depressed rounded large dark color="red">
			<v-icon left>mdi-currency-usd</v-icon>打赏该主题
		</v-btn>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * 主题
		 */
		thread: Object,
	},
	data(){
		return {
			loading: false,
		}
	},
	methods: {
		async reward() {
			this.loading = true;
			await this.$swal("暂不支持打赏");
			this.loading = false;
		},
	},
};
</script>

<style>
</style>