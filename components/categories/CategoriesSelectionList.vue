<template>
	<div class="mr-2">
		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					text
					color="primary"
					dark
					:loading="loading"
					v-bind="attrs"
					v-on="on"
				>{{selectedItem ? `发布到：${selectedItem.attributes.name }`: '选择分类'}}</v-btn>
			</template>
			<v-list>
				<template v-for="(c, i) in categories">
					<v-list-item v-if="c.id != 0 && c.attributes.canCreateThread" @click="selected(c)" :key="i">
						<v-list-item-title>{{ c.attributes.name }}</v-list-item-title>
					</v-list-item>
				</template>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters({
			categories: types.GETTERS_CATEGORIES,
		}),
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("getCategories");
			this.loading = false;
			this.init();
		});
	},
	data() {
		return {
			selectedItem: null,
			/**
			 * loading categories
			 */
			loading: true,
		};
	},
	methods: {
		/**
		 * 初始化默认选中
		 */
		init() {
			const { categories } = this;
			if (!this.$_.isEmpty(categories)) {
				const cat = categories.filter((it) => it.id != 0)[0];
				this.selected(cat);
			}
		},
		/**
		 * 被选中
		 */
		selected(cat) {
			this.selectedItem = cat;
			this.$emit("category", {
				data: {
					type: "categories",
					id: cat.id,
				},
			});
		},
	},
};
</script>

<style>
</style>