<template>
	<div>
		<v-chip
			close
			label
			@click:close="()=>$emit('del-attachments', attachment)"
		>
			<v-icon left>mdi-folder</v-icon>
			{{fileName}}
		</v-chip>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * 附件
		 */
		attachment: Object,
	},
	data() {
		return {};
	},
	computed: {
		/**
		 * 文件名
		 */
		fileName() {
			const { attachment } = this;
			if (this.$_.isEmpty(attachment)) {
				return "unknown";
			}

			return attachment.attributes.fileName;
		},
	},
};
</script>

<style>
</style>