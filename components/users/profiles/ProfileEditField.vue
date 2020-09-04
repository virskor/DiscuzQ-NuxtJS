<template>
	<div>
		<v-dialog v-model="showDialog" persistent max-width="490">
			<template v-slot:activator="{ on, attrs }">
				<v-list-item @click="showDialog = true">
					<v-list-item-content>
						<v-list-item-title>{{label || "未知的选项"}}</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn :ripple="false" text v-bind="attrs" v-on="on" rounded small>
							{{actionName || "修改"}}
							<v-icon right>mdi-chevron-right</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</template>
			<v-card>
				<v-card-title class="headline">修改{{label}}</v-card-title>
				<v-card-text>即将支持填写新的{{label}}</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="showDialog = false">取消</v-btn>
					<v-btn color="primary" rounded dark @click="save">完成并保存</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
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
		attribute: String,
	},
	data() {
		return {
			showDialog: false,
		};
	},
	methods: {
		async save() {
			await this.$swal("即将支持");
			this.showDialog = false;
		},
	},
};
</script>

<style>
</style>