<template>
	<v-navigation-drawer class="end-drawer" :width="150" app right v-model="show">
		<v-toolbar flat></v-toolbar>
		<v-list color="transparent">
			<v-list-item>
				<v-list-item-title>暂无私信</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
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
};
</script>

<style>
</style>