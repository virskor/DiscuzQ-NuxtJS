<template>
	<v-switch v-model="removeChargedThreads" @click="updateConf" hide-details inset></v-switch>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			removeChargedThreads: false,
		};
	},
	computed: {
		...mapGetters({
			appConf: types.GETTERS_APPCONF,
		}),
	},
	mounted(){
		this.$nextTick(()=>{
			const {appConf} = this;
			this.removeChargedThreads = appConf.removeChargedThreads;
		});
	},
	methods: {
		/**
		 * 更新配置
		 */
		updateConf() {
			const { removeChargedThreads } = this;
			this.$store.dispatch("updateAppConf", { removeChargedThreads });
		},
	},
};
</script>

<style>
</style>
