<template>
	<div>
		<AppTitle showExtendedNav :title="title"></AppTitle>
		<v-container>
			<MessageTypesMenuList></MessageTypesMenuList>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import MessageTypesMenuList from "~/components/message/MessageTypesMenuList";

export default {
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		hasLogined() {
			const { user } = this;
			return !this.$_.isEmpty(user);
		},
		/**
		 * 标题
		 */
		title() {
			const { hasLogined, user } = this;
			if (!hasLogined) {
				return "消息提醒";
			}

			const unreadNotifications = user.attributes.unreadNotifications || 0;
			return `消息提醒(${unreadNotifications}条未读)`;
		},
	},
	head() {
		return {
			title: "消息提醒",
		};
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
		});
	},
	components: {
		MessageTypesMenuList,
	},
};
</script>
