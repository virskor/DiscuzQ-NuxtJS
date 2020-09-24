<template>
	<div>
		<AppTitle title="个人资料"></AppTitle>

		<v-container>
			<v-card flat tile>
				<v-toolbar flat tile>
					<v-toolbar-title>修改个人资料</v-toolbar-title>
				</v-toolbar>
				<v-list>
					<!--头像-->
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>头像</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<AvatarPicker></AvatarPicker>
						</v-list-item-action>
					</v-list-item>
					<v-divider></v-divider>
					<!--用户名-->
					<!--用户名仅允许修改一次-->
					<ProfileEditField
						attribute="username"
						:disabled="user ? !user.attributes.canEditUsername : true"
						:actionName="user ? user.attributes.username : '修改'"
						singleLine
						label="用户名"
					></ProfileEditField>
					<v-divider></v-divider>
					<ProfileEditField
						attribute="mobile"
						disabled
						:actionName="user ? user.attributes.mobile : '修改'"
						singleLine
						label="手机号码"
					></ProfileEditField>
					<v-divider></v-divider>
					<!--个性签名-->
					<ProfileEditField attribute="signature" :singleLine="false" label="个性签名"></ProfileEditField>
				</v-list>
			</v-card>
		</v-container>

		<v-container>
			<v-card flat tile>
				<v-toolbar flat tile>
					<v-toolbar-title>账户安全相关</v-toolbar-title>
				</v-toolbar>
				<v-list-item @click="$router.push('/users/deny')">
					<v-list-item-content>
						<v-list-item-title>我屏蔽的用户</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn :ripple="false" text small>
							查看与修改
							<v-icon right>mdi-chevron-right</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import ProfileEditField from "~/components/users/profiles/ProfileEditField";
import AvatarPicker from "~/components/users/AvatarPicker";

export default {
	head() {
		return {
			title: "个人资料",
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
		});
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
	},
	components: {
		ProfileEditField,
		AvatarPicker,
	},
};
</script>

<style>
</style>