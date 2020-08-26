<template>
	<v-card tile flat class="text-center pa-5">
		<p><span>暂无评论，快来占楼</span></p>
		<v-btn @click="create" depressed rounded color="primary">发布评论</v-btn>
	</v-card>
</template>

<script>
export default {
    methods: {
        create(){
            this.$swal('暂不支持');
        }
    }
};
</script>

<style>
</style>