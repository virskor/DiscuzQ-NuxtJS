<template>
	<v-navigation-drawer class="end-drawer" width="300" app right v-model="show">
		<EndDrawerHeader/>
		<HomePageDrawer />
	</v-navigation-drawer>
</template>

<script>
import EndDrawerHeader from "~/components/navigationDrawers/EndDrawerHeader";
import HomePageDrawer from "~/components/navigationDrawers/HomePageDrawer";

export default {
	props: {
		value: Boolean,
	},
	data() {
		return {
			show: false,
		};
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
	components: {
		HomePageDrawer,
		EndDrawerHeader
	}
};
</script>

<style>
</style>