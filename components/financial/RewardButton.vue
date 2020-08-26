<template>
	<div class="text-center mb-4 mt-4">
		<v-dialog transition="dialog-bottom-transition" v-model="dialog" persistent max-width="500">
			<template v-slot:activator="{ on, attrs }">
				<v-btn :loading="loading" v-bind="attrs" v-on="on" depressed rounded large dark color="red">
					<v-icon left>mdi-currency-usd</v-icon>打赏该主题
				</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline">支持作者继续创作</v-card-title>
				<v-card-text>为创作者打赏，打赏后无法撤回</v-card-text>
				<v-card-content>
					<RewardDialogItems @continuTopay="reward" @open="dialog = true" @close="dialog = false"></RewardDialogItems>
				</v-card-content>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="dialog = false">取消</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import RewardDialogItems from "~/components/financial/RewardDialogItems";

export default {
	props: {
		/**
		 * 主题
		 */
		thread: Object,
	},
	data() {
		return {
			loading: false,
			dialog: false,
		};
	},
	methods: {
		async reward(amounts) {
			this.dialog = false;
			this.loading = true;
			await this.$swal("暂不支持打赏");
			this.loading = false;
		},
	},
	components: {
		RewardDialogItems,
	},
};
</script>

<style>
</style>