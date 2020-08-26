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
			<template v-if="!$_.isEmpty(users)">
				<template v-for="(user, i) in users">
					<var-box :group="mapUserGroup(user.relationships)" :key="i" v-slot="{ group }">
						<UserSearchItem v-if="user" :group="group" :user="user" :key="i"></UserSearchItem>
					</var-box>
				</template>

				<MorePage
					caption="加载更多用户"
					:loading="loading"
					@input="searchUser"
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
		 * 绑定关键词
		 */
		keyword: String,
	},
	mounted() {
		this.$nextTick(async () => {
			this.searchUser();
		});
	},
	data() {
		return {
			usersData: null,
			loading: false,
			pageNumber: 1,
			/**
			 * 分页数据
			 */
			meta: null,
		};
	},
	computed: {
		users() {
			const { usersData } = this;
			return this.$_.isEmpty(usersData) ? [] : usersData.data;
		},
	},
	methods: {
		/**
		 * 查询用户
		 */
		async searchUser() {
			const { keyword, pageNumber, usersData } = this;

			const data = {
				sort: "createdAt",
				"page[number]": pageNumber,
				"filter[username]": `*${keyword}*`,
			};

			this.loading = true;

			const rs = await usersAPI.getUsers(data);

			this.loading = false;

			if (rs) {
				this.meta = rs.meta;
				if (!usersData) {
					this.usersData = rs;
					return;
				}
				if (!this.$_.isEmpty(rs.data)) {
					this.usersData = {
						data: [...usersData.data, ...rs.data],
						included: [...usersData.included, ...rs.included],
					};
				}
			}
		},
		/**
		 * map user group
		 */
		mapUserGroup(relationships) {
			const { usersData } = this;
			const groups = usersData.included;
			const currentGroup = relationships.groups.data[0];

			if (currentGroup) {
				return groups.find(
					(el) => el.type == "groups" && el.id == currentGroup.id
				);
			}
		},
	},
	watch: {
		keyword: _.debounce(function (w) {
			if (w) {
				this.usersData = null;
				this.pageNumber = 1;
				this.searchUser();
			}
		}, 500),
	},
	components: {
		UserSearchItem,
	},
};
</script>

<style>
</style>