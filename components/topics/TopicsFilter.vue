<template>
	<v-menu bottom left>
		<template v-slot:activator="{ on, attrs }">
			<v-btn depressed text color="primary" v-bind="attrs" v-on="on">
				<v-icon>mdi-sort-variant</v-icon>
				&nbsp;
				{{selectedItem.caption || '热度'}}
			</v-btn>
		</template>

		<v-list>
			<v-list-item v-for="(item, i) in items" :key="i" @click="emit(item)">
				<v-list-item-title>{{ item.caption }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
export default {
	props: {
		/**
		 * v-model
		 */
		value: String,
	},
	data() {
		return {
			items: [
				{ caption: "热度", value: "-viewCount" },
				{ caption: "内容数", value: "-threadCount" },
			],
			selectedItem: "",
		};
	},
	methods: {
		/**
		 * emit input event
		 */
		emit(item) {
			this.selectedItem = item;
			this.$emit("input", item.value || "-viewCount");
		},
	},
};
</script>

<style>
</style>