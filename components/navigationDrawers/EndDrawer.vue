<template>
	<v-navigation-drawer class="end-drawer"  app v-model="show" right>
		<v-toolbar v-if="$route.path.indexOf('/search/') < 0" dense elevation="0">
			<SearchField />
		</v-toolbar>

		<v-card tile flat>
			<v-list>
				<SiteInfo subHeader></SiteInfo>
				<v-divider></v-divider>

				<RecentTopics></RecentTopics>
				<UserRecommendList></UserRecommendList>
			</v-list>
		</v-card>
	</v-navigation-drawer>
</template>

<script>
import SearchField from "~/components/SearchField";
import RecentTopics from "~/components/topics/RecentTopics";
import UserRecommendList from "~/components/users/UserRecommendList";
import SiteInfo from "~/components/common/SiteInfo";

export default {
	props: {
		value: Boolean,
	},
	data() {
		return {
			show: true,
		};
	},
	computed: {
		width() {
			return this.$C.isMobile() ? 300 : 440;
		},
	},
	components: {
		SearchField,
		UserRecommendList,
		RecentTopics,
		SiteInfo,
	},
	mounted() {
		this.$nextTick(() => {
			this.show = this.value;
		});
	},
	watch: {
		value() {
			this.show = this.value;
		},
		show() {
			this.$emit("input", this.show);
		},
	},
};
</script>

<style>
</style>