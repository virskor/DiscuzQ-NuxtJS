<template>
	<div>
		<v-btn @click="sendMessage" dark color="primary" rounded depressed>
			<v-icon left>mdi-message</v-icon>发私信
		</v-btn>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * 目标用户
		 */
		targetUser: Object,
    },
    methods: {
        /**
         * 发送私信，调用私信发送组件弹出聊天窗口
         */
        sendMessage(){
            const {targetUser} = this;

            this.$swal('即将支持');
        }
    }
};
</script>

<style>
</style>