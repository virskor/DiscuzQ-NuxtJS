<template>
	<div>
		<AppTitle showExtendedNav title="编辑器"></AppTitle>
		<v-container>
			<Editor enablePrice enableAttachment></Editor>
		</v-container>
	</div>
</template>

<script>
import Editor from "~/components/editor/Editor";

export default {
	mounted() {
		this.$nextTick(async () => {
			// await this.$store.dispatch("shouldLogin");
		});
	},
	components: {
		Editor,
	},
};
</script>

<style>
</style>