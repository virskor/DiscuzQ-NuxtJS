<template>
	<v-list>
		<v-subheader>提醒</v-subheader>
		<v-list-item-group color="primary" class="pr-2">
			<v-list-item @click="openMessageList(item)" v-for="(item, i) in messageTypes" :key="i">
				<v-list-item-icon>
					<v-icon v-text="item.icon"></v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title v-text="item.caption"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-badge
						v-if="!$_.isEmpty(typeUnreadNotifications) && typeUnreadNotifications[item.value]"
						color="red"
						:content="typeUnreadNotifications[item.value]"
					>
						<v-icon>mdi-chevron-right</v-icon>
					</v-badge>
					<v-icon v-else>mdi-chevron-right</v-icon>
				</v-list-item-action>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			messageTypes: [
				{ icon: "mdi-at", caption: "@我的", value: "related" },
				{ icon: "mdi-reply", caption: "回复我的", value: "replied" },
				{ icon: "mdi-thumb-up", caption: "点赞我的", value: "liked" },
				{
					icon: "mdi-wallet",
					caption: "财务通知",
					value: "rewarded,withdrawal",
				},
				{ icon: "mdi-bell", caption: "系统通知", value: "system" },
			],
		};
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		/**
		 * 未读消息列表
		 */
		typeUnreadNotifications() {
			const { user } = this;
			if(this.$_.isEmpty(user)){
				return null;
			}
			return user.attributes.typeUnreadNotifications;
		},
	},
	methods: {
		openMessageList(m) {
			this.$router.push({
				path: "/views/noticelist",
				query: { type: m.value, title: m.caption },
			});
		},
	},
};
</script>

<style>
</style>