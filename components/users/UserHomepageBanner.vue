<template>
	<v-card class="mx-auto userHomePageBanner" tile flat>
		<v-list-item class="grow">
				<v-list-item-avatar :size="60" tile>
					<Avatar :user="user"></Avatar>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>
						<span class="font-weight-black text-h6">{{user.attributes.username}}</span>
						<span
							v-if="!$_.isEmpty(user.attributes.signature)"
						>({{user.attributes.signature}})</span>
					</v-list-item-title>
					<v-list-item-subtitle>{{group.attributes.name}}</v-list-item-subtitle>
				</v-list-item-content>

				<v-list-item-action>
					<!--关注按钮-->
					<UserFollowButton :user="user"></UserFollowButton>
				</v-list-item-action>
			</v-list-item>
	</v-card>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import Avatar from "~/components/users/Avatar";
import UserFollowButton from "~/components/users/follow/UserFollowButton";

export default {
	props: {
		/**
		 * 用户模型
		 */
		user: Object,
		/**
		 * 用户组信息
		 */
		group: Object,
	},
	components: {
		Avatar,
		UserFollowButton
	},
	computed: {
		...mapGetters({
			appConf: types.GETTERS_APPCONF,
		}),
	},
	mounted() {},
	beforeDestroy() {},
};
</script>

<style lang="less">
.userHomePageBanner {
	padding-top: 20px;
	//border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>