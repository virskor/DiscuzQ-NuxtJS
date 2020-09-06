<template>
	<div class="pa-3">
		<v-divider></v-divider>
		<div class="mt-3">温馨提示：上传的图片不应该涉及违规，版权争议等违反用户协议的内容，否则将承担法律责任。</div>
	</div>
</template>

<script>
/// attachments
/// del-attachments
import attachmentsAPI from "~/api/attachments";

export default {
	data(){
		return {
			attachments: []
		}
	},
	methods: {
		upload(){
			
		}
	}
};
</script>

<style>
</style>