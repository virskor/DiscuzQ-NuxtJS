<template>
	<v-toolbar color="mb-2" flat rounded>
		<v-spacer></v-spacer>
		<v-btn depressed>
			快捷导航
			<v-icon right>mdi-chevron-down</v-icon>
		</v-btn>
	</v-toolbar>
</template>

<script>
import NavigationItems from "~/components/navigationDrawers/NavigationItems";

export default {
    mixins: [NavigationItems],
	components: {
	},
};
</script>

<style>
</style>