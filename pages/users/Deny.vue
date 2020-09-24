<template>
	<div>
		<AppTitle title="屏蔽的用户"></AppTitle>

		<v-container>
			<v-toolbar flat tile>
				<v-toolbar-title>共屏蔽 {{meta ? meta.total : 0}} 人</v-toolbar-title>
			</v-toolbar>

			<v-card class="pb-3" flat tile>
				<!--没有数据-->
				<EmptyBox :refresh="false" v-if="$_.isEmpty(blockedUsers) && !loading"></EmptyBox>

				<!--被屏蔽的用户列表-->
				<v-list v-else>
					<UserDenyListItem v-for="(u, i) in blockedUsers" @undeny="onWantUndenyUser" :user="u" :key="i"></UserDenyListItem>
				</v-list>
			</v-card>

			<!--分页组件-->
			<MorePage
				caption="加载更多"
				:loading="loading"
				@input="listAllBlockedUsers"
				:length="meta ? meta.pageCount : 1"
				v-model="pageNumber"
			></MorePage>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import usersAPI from "~/api/users";
import UserDenyListItem from "~/components/users/UserDenyListItem";

export default {
	head() {
		return {
			title: "屏蔽的用户",
		};
	},
	computed: {
		...mapGetters({
			user: types.GETTERS_USER,
		}),
	},
	mounted() {
		this.$nextTick(async () => {
			await this.$store.dispatch("shouldLogin");
			await this.listAllBlockedUsers();
		});
	},
	data() {
		return {
			/**
			 * pageNumber
			 */
			pageNumber: 1,
			/**
			 * meta
			 */
			meta: null,
			/**
			 * blocked users
			 * 被屏蔽的用户
			 */
			blockedUsers: [],
			/**
			 * 是否正在加载
			 */
			loading: false,
		};
	},
	methods: {
		/**
		 * 列出所有被屏蔽的用户
		 */
		async listAllBlockedUsers() {
			const { pageNumber, blockedUsers, user } = this;

			if (!user) {
				return;
			}

			this.loading = true;

			const rs = await usersAPI.denyUsersList(user, {
				"page[number]": pageNumber,
			});

			this.loading = false;

			if (rs) {
				this.meta = rs.meta;

				if (!blockedUsers) {
					this.blockedUsers = rs.data;
					return;
				}

				if (!this.$_.isEmpty(rs.data)) {
					this.blockedUsers = [...blockedUsers, ...rs.data];
				}
			}
		},
		/**
		 * 当用户被取消屏蔽，将其假删除
		 */
		onWantUndenyUser(user) {
			const { blockedUsers, meta } = this;
			this.blockedUsers = blockedUsers.filter((u) => u.id != user.id);
			if (!this.$_.isEmpty(meta)) {
				this.meta.total = meta.total - 1;
			}
		},
	},
	components: {
		UserDenyListItem,
	},
};
</script>
