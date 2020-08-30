<template>
	<div>
		<AppTitle showExtendedNav title="偏好设置"></AppTitle>
		<v-alert text tile dense type="info">部分设置在您下次清除浏览器缓存，重新访问时将会失效</v-alert>

		<v-container fluid>
			<v-list>
				<v-subheader>应用偏好</v-subheader>
				<v-list-item-group color="primary">
					<!--黑暗模式切换-->
					<v-list-item>
						<v-list-item-icon>
							<v-icon>mdi-theme-light-dark</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>黑暗模式</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<DarkSwitcher></DarkSwitcher>
						</v-list-item-action>
					</v-list-item>

					<!--Discuz!X 经典布局-->
					<!-- <AppConfSwitcher label="经典布局" icon="mdi-monitor-multiple" keyName="classicalTheme"></AppConfSwitcher> -->
				</v-list-item-group>
				<v-subheader>内容相关</v-subheader>
				<v-list-item-group color="primary">
					<!--黑暗模式切换-->
					<AppConfSwitcher label="不看付费的帖子" icon="mdi-currency-usd" keyName="removeChargedThreads"></AppConfSwitcher>
				</v-list-item-group>
			</v-list>
		</v-container>
	</div>
</template>

<script>
import DarkSwitcher from "~/components/settings/DarkSwitcher";
import AppConfSwitcher from "~/components/settings/AppConfSwitcher";

export default {
	head() {
		return {
			title: "设置",
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
		});
	},
	data() {
		return {};
	},
	components: { DarkSwitcher, AppConfSwitcher },
};
</script>
