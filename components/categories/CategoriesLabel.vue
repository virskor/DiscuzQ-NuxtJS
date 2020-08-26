<template>
	<div>
		<v-chip
			@click="$router.push({path: '/views/categories', query:{categoryid: currentCategory.id}})"
			label
			v-if="currentCategory"
			class="mb-2 mt-1"
			outlined
			small
		>版块：{{currentCategory.attributes.name}}</v-chip>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	props: {
		/**
		 * 分类的ID
		 */
		categoryID: String,
	},
	computed: {
		...mapGetters({
			categories: types.GETTERS_CATEGORIES,
		}),
		/**
		 * 关联分类
		 */
		currentCategory() {
			const { categories, categoryID } = this;
			return categories.find((el) => el.id == categoryID);
		},
	},
};
</script>

<style>
</style>