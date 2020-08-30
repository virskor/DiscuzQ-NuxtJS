<template>
	<div>
		<AppTitle showExtendedNav title="编辑器"></AppTitle>
		<v-container fluid>
			<QuillEditor></QuillEditor>
		</v-container>
	</div>
</template>

<script>
import QuillEditor from "~/components/editor/QuillEditor";

export default {
	components: {
		QuillEditor,
	},
};
</script>

<style>
</style>