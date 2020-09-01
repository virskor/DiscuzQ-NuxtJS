<template>
	<v-card outlined class="pa-2 pb-4">
		<!--渲染发布用户的信息-->
		<ThreadCardUser :firstPost="firstPost" :user="user"></ThreadCardUser>
        <ThreadContents
				class="pl-5 pr-5"
				isFloor
				:thread="thread"
				:firstPost="firstPost"
			></ThreadContents>
	</v-card>
</template>

<script>
import ThreadCardUser from "~/components/threads/ThreadCardUser";
import ThreadContents from "~/components/threads/ThreadContents";

export default {
	props: {
		/**
		 * 当前主题对象
		 */
		thread: Object,
		/**
		 * 当前主题发布的用户
		 */
		user: Object,
		/**
		 * 当前主题的firstPost
		 */
		firstPost: Object,
	},
	components: {
		ThreadCardUser,
		ThreadContents,
	},
};
</script>

<style>
</style>