<template>
	<v-btn text depressed @click="$router.push(`/reports/?user_id=${user.id}`)">
		<v-icon left>mdi-flag</v-icon>举报
	</v-btn>
</template>

<script>
export default {
	props: {
        /**
         * 要举报的用户
         */
		user: Object,
	},
};
</script>

<style>
</style>