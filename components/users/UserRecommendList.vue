<template>
	<div>
		<v-card flat tile>
			<v-row align="center">
				<v-col cols="6">
					<v-subheader>推荐的用户</v-subheader>
				</v-col>
				<v-col cols="6" class="text-right">
					<v-btn @click="$router.push('/search/users')" color="primary" small text>更多</v-btn>
				</v-col>
			</v-row>
			<template v-if="loading">
				<v-sheet class="px-3 pt-3 pb-3">
					<v-skeleton-loader
						v-for="(_, i) in pageLimit"
						:key="i"
						ref="skeleton"
						type="list-item-avatar"
						class="mx-auto"
					></v-skeleton-loader>
				</v-sheet>
			</template>
			<template v-else>
				<!--暂无可推荐的用户-->
				<template v-if="!recommendUserlist.length">
					<center>
						<v-list-item-title>暂无推荐</v-list-item-title>
					</center>
				</template>
				<!--渲染推荐的用户-->
				<template v-else>
					<v-list>
						<v-list-item v-for="(user, i) in recommendUserlist" :key="i">
							<v-list-item-avatar :size="50" tile>
								<Avatar :user="user"></Avatar>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title class="font-weight-black">{{user.attributes.username}}</v-list-item-title>
								<v-list-item-subtitle>{{user.attributes.signature|| ''}}</v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-icon>
								<v-btn :ripple="false" icon rounded @click="visit(user)" small>
									<v-icon>mdi-chevron-right</v-icon>
								</v-btn>
							</v-list-item-icon>
						</v-list-item>
					</v-list>
				</template>
			</template>
		</v-card>
	</div>
</template>

<script>
import usersAPI from "~/api/users";
import Avatar from "~/components/users/Avatar";

export default {
	name: "UserRecommendList",
	mounted() {
		this.$nextTick(async () => {
			this.listRecommendUsers();
		});
	},
	data() {
		return {
			loading: true,
			pageLimit: 6,
			recommendUserlist: [],
		};
	},
	methods: {
		async listRecommendUsers() {
			const { pageLimit } = this;

			const rs = await usersAPI.searchUsers({
				"page[limit]": pageLimit,
				//"filter[isReal]": "yes", /// 尝试推荐实名用户
				"filter[status]": 0, /// 用户状态要正常
			});
			this.loading = false;
			if (rs) {
				this.recommendUserlist = rs.data || [];
			}
		},
		/**
		 * visit
		 * 查看用户主页
		 */
		async visit(user) {
			const id = user.id || 0;
			this.$router.push({ path: `/users/${id}` });
		},
	},
	components: {
		Avatar,
	},
};
</script>

<style>
</style>