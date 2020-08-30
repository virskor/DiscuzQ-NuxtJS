<template>
	<div>
		<AppTitle showExtendedNav title="编辑器"></AppTitle>
		<v-container fluid>
			<Editor></Editor>
		</v-container>
	</div>
</template>

<script>
import Editor from "~/components/editor/Editor";

export default {
	components: {
		Editor,
	},
};
</script>

<style>
</style>