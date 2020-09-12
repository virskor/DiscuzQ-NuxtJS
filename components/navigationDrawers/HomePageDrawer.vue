<template>
	<div>
		<v-toolbar elevation="0">
			<SearchField />
		</v-toolbar>

		<v-list>
			<SiteInfo subHeader></SiteInfo>
			<v-divider></v-divider>

			<RecentTopics></RecentTopics>
			<UserRecommendList></UserRecommendList>
		</v-list>
	</div>
</template>

<script>
import RecentTopics from "~/components/topics/RecentTopics";
import UserRecommendList from "~/components/users/UserRecommendList";
import SiteInfo from "~/components/common/SiteInfo";

export default {
	computed: {
		width() {
			return this.$C.isMobile() ? 300 : 440;
		},
	},
	components: {
		UserRecommendList,
		RecentTopics,
		SiteInfo,
	},
};
</script>

<style>
</style>