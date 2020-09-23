<template>
	<div>
		<AppTitle title="投诉举报"></AppTitle>
	</div>
</template>

<script>
export default {
	head() {
		return {
			title: "投诉举报",
		};
	},
	mounted() {
		this.$nextTick(async()=>{
			await this.$store.dispatch("shouldLogin");
		});
	},
};
</script>
