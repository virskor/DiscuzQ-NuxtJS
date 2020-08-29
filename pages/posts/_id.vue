<template>
	<div>
		<AppTitle title="评论"></AppTitle>
	</div>
</template>

<script>
export default {
	validate({ params }) {
		// 必须是number类型
		return /^\d+$/.test(params.id);
    },
    head(){
        return {
            title: '评论'
        }
    }
};
</script>

<style>
</style>