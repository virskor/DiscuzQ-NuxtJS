<template>
	<div class="text-center mt-3 ">
		<v-btn block :disabled="canContinue" color="primary" rounded outlined :loading="waiting" @click="next">
			{{!canContinue ? (caption || '查看更多'): '没有更多了'}}
			<slot />
		</v-btn>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * 当前绑定的页码
		 */
		value: Number,
		/**
		 * length page number
		 */
		length: Number,
		/**
		 * caption
		 * 标题，默认为加载更多
		 */
		caption: String,
		/**
		 * loading
		 */
		loading: Boolean,
	},
	computed: {
		/**
		 * 是否可以继续
		 */
		canContinue() {
			const { length, value } = this;
			return value >= length ? true : false;
		},
		/**
		 * waiting
		 */
		waiting() {
			const { loading } = this;
			return loading;
		},
	},
	methods: {
		next() {
			const nextPageNumber = this.value + 1;
			this.$emit("input", nextPageNumber);
		},
	},
};
</script>

<style>
</style>