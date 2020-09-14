<template>
	<div>
		<v-dialog v-model="showDialog" persistent max-width="490">
			<template v-slot:activator="{ on, attrs }">
				<v-list-item :disabled="disabled" @click="showDialog = true">
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
				<div class="pl-6 pr-6">
					<v-text-field v-if="singleLine" v-model="value" :label="label" :placeholder="`请输入${label}`"></v-text-field>
					<v-textarea v-else v-model="value" :label="label" :placeholder="`请输入${label}`"></v-textarea>
				</div>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="showDialog = false">取消</v-btn>
					<v-btn color="primary" rounded depressed dark @click="save">完成并保存</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import usersAPI from "~/api/users";

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
		/**
		 * single line
		 */
		singleLine: Boolean,
		/**
		 * disabled
		 */
		disabled: Boolean
	},
	data() {
		return {
			showDialog: false,
			value: "",
		};
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
	},
	mounted() {
		this.$nextTick(async () => {
			/**
			 * 默认自动明填充
			 */
			const { user, attribute } = this;
			this.value = user.attributes[attribute];
		});
	},
	methods: {
		/**
		 * 保存个人资料
		 */
		async save() {
			const { attribute,label, user, value } = this;

			let fields = {};
			fields[attribute] = value;

			const rs = await usersAPI.profile(user, fields);
			if (rs) {
				await this.$store.dispatch('updateCurrentUser', rs.data);
				await this.$swal(
					"修改成功!",
					`${label}修改成功`,
					"success"
				);
				this.showDialog = false;
			}
		},
	},
};
</script>

<style>
</style>