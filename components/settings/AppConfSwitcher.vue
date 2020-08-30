<template>
	<v-list-item>
		<v-list-item-icon>
			<v-icon>{{icon}}</v-icon>
		</v-list-item-icon>
		<v-list-item-content>
			<v-list-item-title>{{label}}</v-list-item-title>
		</v-list-item-content>
		<v-list-item-action>
			<v-switch v-model="value" @click="updateConf" hide-details inset></v-switch>
		</v-list-item-action>
	</v-list-item>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	props: {
		keyName: String,
		label: String,
		icon: String,
	},
	data() {
		return {
			value: false,
		};
	},
	computed: {
		...mapGetters({
			appConf: types.GETTERS_APPCONF,
		}),
	},
	mounted() {
		this.$nextTick(() => {
			const { appConf, keyName } = this;
			this.value = appConf[keyName];
		});
	},
	methods: {
		/**
		 * 更新配置
		 */
		updateConf() {
			const { value, keyName } = this;
			let data = {};
			data[keyName] = value;
			this.$store.dispatch("updateAppConf", { ...data });
		},
	},
};
</script>

<style>
</style>
