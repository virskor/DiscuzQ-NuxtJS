<template>
	<div>
		<AppTitle title="用户搜索">
			<v-text-field
				v-model="keyword"
				solo-inverted
				flat
				dense
				rounded
				hide-details
				label="输入用户名"
				prepend-inner-icon="mdi-magnify"
			></v-text-field>
		</AppTitle>

		<v-container>
			<UserSearchList :keyword="keyword"></UserSearchList>
		</v-container>
	</div>
</template>

<script>
import UserSearchList from "~/components/users/search/UserSearchList";

export default {
	head() {
		return {
			title: "用户搜索",
		};
	},
	data() {
		return {
			/**关键字 */
			keyword: this.$route.query.keyword || "",
		};
	},
	methods: {
		async search() {},
	},
	components: {
		UserSearchList,
	},
};
</script>

<style>
</style>