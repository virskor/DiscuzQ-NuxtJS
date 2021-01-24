<template>
	<div>
		<AppTitle showExtendedNav title="站点信息"></AppTitle>
		<v-container class="scaffold">
			<!--顶部-->
			<SiteInfo>
				<center>
					<AppLogo class="pb-5 pt-5" :width="100"></AppLogo>
				</center>
			</SiteInfo>

			<!--站点信息呈现-->
			<v-card v-if="forum" flat>
				<!--set_site-->
				<v-list>
					<v-list-item v-for="(info, i) in siteInfoGroups" :key="i">
						<v-list-item-content>
							<v-list-item-title>{{info.caption}}</v-list-item-title>
						</v-list-item-content>
						<!--站点设置信息-->
						<v-list-item-action v-if="info.isSetSite">
							<template v-if="!info.formatDatetime">{{forum.attributes.set_site[info.attribute]}}</template>
							<template>{{$C.formatDateTime(forum.attributes.set_site[info.attribute])}}</template>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import SiteInfo from "~/components/common/SiteInfo";

export default {
	head() {
		return {
			title: "站点信息",
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
		});
	},
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
		}),
	},
	data() {
		return {
			siteInfoGroups: [
				{
					caption: "站点名称",
					isSetSite: true,
					attribute: "site_name",
					formatDatetime: false,
				},
				{
					caption: "站点介绍",
					isSetSite: true,
					attribute: "site_introduction",
					formatDatetime: false,
				},
				{
					caption: "创建时间",
					isSetSite: true,
					attribute: "site_install",
					formatDatetime: true,
				},
				{
					caption: "ICP备案号",
					isSetSite: true,
					attribute: "site_record",
					formatDatetime: false,
				},
			],
		};
	},
	components: {
		SiteInfo,
	},
};
</script>
