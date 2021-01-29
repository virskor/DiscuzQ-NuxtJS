<template>
	<div v-if="categories">
		<v-tabs v-model="tab" show-arrows>
			<template v-for="(cat, i) in categories">
				<v-tab
					class="text-h5 font-weight-bold"
					:key="i"
					:ripple="false"
					v-if="cat.attributes.name != '我的'"
					@click="onChanged(cat)"
				>{{cat.attributes.name}}</v-tab>

				<v-tab-item class="app-global-theme" :key="i">
					<v-container pa-0 fluid>
						<ThreadList :category="cat"></ThreadList>
					</v-container>
				</v-tab-item>
			</template>
		</v-tabs>
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