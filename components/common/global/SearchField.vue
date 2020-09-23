<template>
	<v-text-field
		flat
		solo-inverted
		hide-details
		dense
		prepend-inner-icon="mdi-magnify"
		label="搜索帖子"
		class="hidden-sm-and-down"
		v-model="keyword"
		@keydown.enter="showResult"
	></v-text-field>
</template>

<script>
export default {
	name: "SearchField",
	data() {
		return {
			keyword: "",
		};
	},
	methods: {
		showResult() {
			const { keyword } = this;
			this.$router.push({ path: "/search/threads/", query: { keyword } });
		},
	},
};
</script>

<style>
</style>