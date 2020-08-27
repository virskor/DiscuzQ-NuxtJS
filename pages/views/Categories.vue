<template>
	<div>
		<AppTitle showExtendedNav title="版块分类">
			<ThreadsFilters />
		</AppTitle>
		<v-container fluid>
			<CategoriesTab />
		</v-container>
	</div>
</template>

<script>
import CategoriesTab from "~/components/categories/CategoriesTab";
import ThreadsFilters from "~/components/threads/ThreadsFilters";

export default {
	head() {
		return {
			title: "分类",
		};
	},
	components: {
		CategoriesTab,
		ThreadsFilters,
	},
};
</script>
