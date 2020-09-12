<template>
	<div>
		<AppTitle title="用户主页">
			<ThreadsFilters v-show="false"></ThreadsFilters>
		</AppTitle>
		<v-container>
			<UserHomepageBanner :user="currentUser" :group="userGroup"></UserHomepageBanner>
		</v-container>
		<v-container>
			<div v-if="!$_.isEmpty(currentUser)">
				<v-tabs fixed-tabs v-model="tab" color="primary" icons-and-text>
					<v-tab v-for="item in items" :key="item.tab">
						{{ item.tab }}
						<p class="font-weight-bold text-h6">{{ currentUser.attributes[item.attribute] }}</p>
					</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item>
						<!--主题列表-->
						<ThreadList class="pa-2" :filterUserID="currentUser.id" />
					</v-tab-item>
					<v-tab-item>
						<FollowersList :user="currentUser"></FollowersList>
					</v-tab-item>
					<v-tab-item>
						<FollowersList :user="currentUser" fromUser></FollowersList>
					</v-tab-item>
					<v-tab-item>
						<ThreadsLikesList :user="currentUser"></ThreadsLikesList>
					</v-tab-item>
				</v-tabs-items>
			</div>
			<div v-else>
				<!--加载中-->
				<template>
					<v-sheet class="px-3 pb-3">
						<v-skeleton-loader
							ref="skeleton"
							type="card-avatar,list-item-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
							class="mx-auto"
						></v-skeleton-loader>
					</v-sheet>
				</template>
			</div>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import usersAPI from "~/api/users";
import UserHomepageBanner from "~/components/users/UserHomepageBanner";
import ThreadList from "~/components/threads/ThreadsList";
import ThreadsFilters from "~/components/threads/ThreadsFilters";
import FollowersList from "~/components/users/follow/FollowersList";
import ThreadsLikesList from "~/components/threads/ThreadsLikesList";

export default {
	validate({ params }) {
		// 必须是number类型
		return /^\d+$/.test(params.id);
	},
	async asyncData({ params, error }) {
		try {
			const rs = await usersAPI.getUser(params.id, {});
			if (!rs) {
				return error({
					statusCode: 502,
					message: "暂时无法查看该用户，请刷新重试",
				});
			}

			return { included: rs.included, currentUser: rs.data };
		} catch (error) {
			throw error;
		}
	},
	head() {
		const { currentUser } = this;

		return {
			title: `${currentUser.attributes.username || "用户"}主页`,
		};
	},
	data() {
		return {
			currentUser: null /** 将被asyncData覆盖 */,
			tab: 0,
			items: [
				{ tab: "主题", attribute: "threadCount" },
				{ tab: "关注", attribute: "followCount" },
				{ tab: "粉丝", attribute: "fansCount" },
				{ tab: "点赞", attribute: "likedCount" },
			],
		};
	},
	computed: {
		/**
		 * 已登录的用户信息
		 */
		...mapGetters({
			user: types.GETTERS_USER,
		}),
		/**
		 * 当前用户的用户组
		 */
		userGroup() {
			const { included, currentUser } = this;

			if (this.$_.isEmpty(included) || this.$_.isEmpty(currentUser)) {
				return null;
			}

			const userRelatedGroups = currentUser.relationships.groups.data[0];
			const userGroups = included.find(
				(el) => el.id == userRelatedGroups.id
			);

			return userGroups;
		},
	},
	components: {
		UserHomepageBanner,
		ThreadList,
		ThreadsFilters,
		FollowersList,
		ThreadsLikesList,
	},
};
</script>

<style>
</style>