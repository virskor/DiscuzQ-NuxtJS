<template>
	<div>
		<div v-if="loading && pageNumber == 1">
			<template>
				<v-sheet class="px-3 pb-3">
					<v-skeleton-loader
						v-for="(_, i) in 20"
						:key="i"
						ref="skeleton"
						type="list-item-avatar-two-line, table-tfoot"
						class="mx-auto"
					></v-skeleton-loader>
				</v-sheet>
			</template>
		</div>
		<div v-else>
			<template v-if="!$_.isEmpty(follows)">
				<template v-for="(follow, i) in follows">
					<var-box :user="mapFollowedUser(follow.relationships)" :key="i" v-slot="{ user }">
						<UserSearchItem v-if="user" showFollowButton :group="mapUserGroup(user.relationships)" :user="user" :key="i"></UserSearchItem>
					</var-box>
				</template>

				<MorePage
					caption="加载更多用户"
					:loading="loading"
					@input="getFollowList"
					:length="meta ? meta.pageCount : 1"
					v-model="pageNumber"
				></MorePage>
			</template>

			<!--没有数据-->
			<EmptyBox :refresh="false" v-else-if="!loading"></EmptyBox>
		</div>
	</div>
</template>

<script>
import _ from "lodash";
import usersAPI from "~/api/users";
import UserSearchItem from "~/components/users/search/UserSearchItem";

export default {
	props: {
		/**
		 * 查询模式为粉丝
		 */
		fromUser: Boolean,
		/**
		 * currentUser
		 */
		user: Object,
	},
	mounted() {
		this.$nextTick(async () => {
			this.getFollowList();
		});
	},
	data() {
		return {
			followData: null,
			loading: false,
			pageNumber: 1,
			/**
			 * 分页数据
			 */
			meta: null,
		};
	},
	computed: {
		/**
		 * 关注记录
		 */
		follows() {
			const { followData } = this;
			return this.$_.isEmpty(followData) ? [] : followData.data;
		},
		/**
		 * 用户数据
		 */
		users() {
			const { followData } = this;
			if (this.$_.isEmpty(followData.included)) {
				return [];
			}
			return followData.included.filter((el) => el.type == "users");
		},
	},
	methods: {
		/**
		 * 查询用户
		 */
		async getFollowList() {
			const { pageNumber, followData, fromUser, user } = this;

			const data = {
				"filter[user_id]": user.id,
				"filter[type]": fromUser ? 2 : 1,
				"page[number]": pageNumber,
			};

			this.loading = true;

			let rs;

			if (fromUser) {
				rs = await usersAPI.followFromUser(data);
			} else {
				rs = await usersAPI.followToUser(data);
			}

			this.loading = false;

			if (rs) {
				this.meta = rs.meta;
				if (!followData) {
					this.followData = rs;
					return;
				}
				if (!this.$_.isEmpty(rs.data)) {
					this.followData = {
						data: [...followData.data, ...rs.data],
						included: [...followData.included, ...rs.included],
					};
				}
			}
		},
		/**
		 * map user group
		 */
		mapUserGroup(relationships) {
			const { followData } = this;
			const groups = followData.included;
			const currentGroup = relationships.groups.data[0];

			if (currentGroup) {
				return groups.find(
					(el) => el.type == "groups" && el.id == currentGroup.id
				);
			}
		},
		/**
		 * 查询follow关联的用户
		 */
		mapFollowedUser(relationships) {
			const { users, fromUser } = this;
            const u = relationships[fromUser ? "fromUser" : "toUser"].data;
			return users.find((el) => el.id == u.id);
		},
	},
	components: {
		UserSearchItem,
	},
};
</script>

<style>
</style>