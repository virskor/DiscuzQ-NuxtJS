<template>
	<div @click="pick">
		<Avatar preventClick :user="user" :size="size"></Avatar>
	</div>
</template>

<script>
/**
 * 头像上传组件
 */
import Avatar from "~/components/users/Avatar";

export default {
	props: {
		/**
		 * 注意，头像直接传入一个对象
		 * 这样做是为了以后更容易拓展
		 */
		user: Object,
		/**
		 * 头像大小
		 */
		size: Number,
    },
    methods: {
        /**
         * 选取头像
         */
        pick(){

        },
        /**
         * 上传头像
         */
        upload(){

        }
    },
	components: {
		Avatar,
	},
};
</script>

<style>
</style>