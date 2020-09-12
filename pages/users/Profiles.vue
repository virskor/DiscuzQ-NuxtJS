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
					<!--个性签名-->
					<ProfileEditField attribute="signature" label="个性签名"></ProfileEditField>
				</v-list>
			</v-card>
		</v-container>
	</div>
</template>

<script>
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
	components: {
		ProfileEditField,
		AvatarPicker
	},
};
</script>

<style>
</style>