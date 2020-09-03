<template>
	<v-list-item @click="showField">
		<v-list-item-content>
			<v-list-item-title>{{label || "未知的选项"}}</v-list-item-title>
		</v-list-item-content>
		<v-list-item-action>
			<v-btn :ripple="false" text rounded small>
				{{actionName || "修改"}}
				<v-icon right>mdi-chevron-right</v-icon>
			</v-btn>
		</v-list-item-action>
	</v-list-item>
</template>

<script>
export default {
	props: {
		/**
		 * label
		 */
		label: String,
		/**
		 * actionName
		 */
        actionName: String,
        /**
         * 要更新的field
         * 如： signature
         */
        attribute: String
    },
    methods: {
        showField(){
            this.$swal('即将支持');
        }
    }
};
</script>

<style>
</style>