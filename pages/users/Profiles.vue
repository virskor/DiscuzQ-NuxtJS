<template>
	<div>
		<AppTitle title="个人资料"></AppTitle>

		<v-container fluid>
			<v-card flat tile>
				<v-toolbar flat tile>
					<v-toolbar-title>修改个人资料</v-toolbar-title>
				</v-toolbar>
				<v-list>
					<ProfileEditField attribute="signature" label="个性签名"></ProfileEditField>
				</v-list>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import ProfileEditField from "~/components/users/profiles/ProfileEditField";

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
	},
};
</script>

<style>
</style>