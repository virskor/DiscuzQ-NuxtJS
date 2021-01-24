<template>
	<div>

		<v-list>
			<RecentTopics></RecentTopics>
			<UserRecommendList></UserRecommendList>
		</v-list>
	</div>
</template>

<script>
import RecentTopics from "~/components/topics/RecentTopics";
import UserRecommendList from "~/components/users/UserRecommendList";

export default {
	computed: {
		width() {
			return this.$C.isMobile() ? 300 : 440;
		},
	},
	components: {
		UserRecommendList,
		RecentTopics,
	},
};
</script>

<style>
</style>