<template>
	<div v-if="categories">
		<v-tabs v-model="tab" color="primary" centered show-arrows>
			<template v-for="(cat, i) in categories">
				<v-tab
					class="text-h5 font-weight-bold"
					:key="i"
					:ripple="false"
					@click="onChanged(cat)"
				>{{cat.attributes.name}}</v-tab>
			</template>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<template v-for="(cat, i) in categories">
				<v-tab-item :key="i">
					<ThreadList :category="category"></ThreadList>
				</v-tab-item>
			</template>
		</v-tabs-items>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import ThreadList from "~/components/threads/ThreadsList";

export default {
	data() {
		return {
			category: null,
			tab: 0,
		};
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
			categories: types.GETTERS_CATEGORIES,
		}),
	},
	mounted() {
		this.$nextTick(async () => {
			const { categories } = this;
			this.category = categories[0];
		});
	},
	methods: {
		onChanged(cat) {
			this.category = cat;
			this.$router.push({
				path: "/views/categories",
				query: { categoryid: cat.id },
			});
		},
	},
	components: {
		ThreadList,
	},
};
</script>

<style>
</style>