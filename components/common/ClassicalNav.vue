<template>
	<v-toolbar color="mb-2" flat rounded>
		<SearchField></SearchField>
		<v-spacer></v-spacer>
		<v-btn depressed>
			快捷导弹
			<v-icon right>mdi-chevron-down</v-icon>
		</v-btn>
	</v-toolbar>
</template>

<script>
import SearchField from "~/components/SearchField";
import NavigationItems from "~/components/navigationDrawers/NavigationItems";

export default {
    mixins: [NavigationItems],
	components: {
		SearchField,
	},
};
</script>

<style>
</style>