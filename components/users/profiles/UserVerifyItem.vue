<template>
	<v-dialog v-model="dialog" persistent max-width="400">
		<template v-slot:activator="{ on, attrs }">
			<v-list-item v-bind="attrs" v-on="on">
				<v-list-item-content>
					<v-list-item-title>实名认证</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn :ripple="false" text small>
						{{actionLabel}}
						<v-icon right>mdi-chevron-right</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</template>
		<v-card>
			<v-card-title class="headline">实名认证账户</v-card-title>
			<v-card-text>实名认证可以再您遗失账号时便捷的找回，或者将为您的将因您的身份显得独特。</v-card-text>
			<div class="ml-6 mr-6">
				<v-row>
					<v-col cols="12" md="12">
						<v-text-field v-model="realname" label="证件中的真实姓名" required></v-text-field>
					</v-col>
					<v-col cols="12" md="12">
						<v-text-field v-model="identity" label="有效的证件号" required></v-text-field>
					</v-col>
				</v-row>
			</div>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn :disabled="loading" text @click="dialog = false">取消</v-btn>
				<v-btn color="primary" :loading="loading" rounded depressed @click="verify">立即认证</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import usersAPI from "~/api/users";

export default {
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		/**
		 * 是否已经实名认证
		 */
		isReal() {
			const { user } = this;
			return !user || !user.attributes.isReal ? false : true;
		},
		/**
		 * 标签
		 */
		actionLabel() {
			const { user, isReal } = this;
			if (!isReal) {
				return "立即认证";
			}

			return user.attributes.realname;
		},
	},
	data() {
		return {
			dialog: false,
			/**
			 * identity
			 * 身份证号
			 */
			identity: "",
			/**
			 * 真实的名字
			 */
			realname: "",
			/**
			 * loading
			 */
			loading: false,
		};
	},
	methods: {
		/**
		 * 提交认证
		 */
		async verify() {
			const { identity, realname } = this;

			if (this.$_.isEmpty(identity) || this.$_.isEmpty(realname)) {
				await this.$swal("请填写有效信息后再继续");
				return;
			}

			this.loading = true;

			const rs = await usersAPI.verify({ identity, realname });

			this.loading = false;

			if (rs) {
				await this.$store.dispatch("updateCurrentUser", rs.data);
				await this.$swal(
					"提交成功!",
					"请耐心等待实名认证审核结果!",
					"success",
					{
						button: "好的",
					}
				);
				this.dialog = false;
			}
		},
	},
};
</script>

<style>
</style>