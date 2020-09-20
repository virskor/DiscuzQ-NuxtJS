<template>
	<div>
		<v-chip
			:close="!disableRemove"
			label
			@click="download"
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
		/**
		 * 不允许删除图标
		 */
		disableRemove: Boolean,
		/**
		 * 允许点击来下载
		 */
		enableDownload: Boolean
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
	methods: {
		/**
		 * 下载文件
		 */
		download(){
			const {enableDownload, attachment} = this;
			if(!enableDownload){
				return;
			}

			const url = attachment.attributes.url;
			let win = window.open();
			win.location.href = url;

		}
	}
};
</script>

<style>
</style>