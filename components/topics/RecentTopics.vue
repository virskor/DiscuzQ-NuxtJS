<template>
	<div>
		<v-card tile flat>
			<v-row align="center">
				<v-col cols="6">
					<v-subheader class="font-weight-black">推荐话题</v-subheader>
				</v-col>
				<v-col cols="6" class="text-right">
					<v-btn @click="$router.push('/views/topics')" color="primary" small text>更多</v-btn>
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
				<template v-if="!topicsList.length">
					<center>
						<v-list-item-title>暂无推荐</v-list-item-title>
					</center>
				</template>
				<template v-else>
					<v-list dense>
						<v-list-item  dense cols="6" class="pa-0 pr-2 pl-2" v-for="(topic, i) in topicsList" :key="i">
							<nuxt-link :to="`/topics/${topic.id}`">
								<v-chip class="clickable" color="blue lighten-5" text-color="primary">
									<v-avatar color="primary" left>
										<i class="iconfont white--text icon-huati2"></i>
									</v-avatar>
									{{topic.attributes.content}}
								</v-chip>
							</nuxt-link>
							<v-spacer></v-spacer>
							<v-list-item-action>
								<span class="v-list-item__subtitle">{{topic.attributes.thread_count}}</span>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</template>
			</template>
		</v-card>
	</div>
</template>

<script>
import topicsAPI from "~/api/topics";

export default {
	name: "RecentTopics",
	data() {
		return {
			topicsList: [],
			loading: true,
			pageLimit: 5,
		};
	},
	mounted() {
		this.$nextTick(async () => {
			this.getRecentTopics();
		});
	},
	methods: {
		/**
		 * 获取最近的话题
		 */
		async getRecentTopics() {
			const { pageLimit } = this;

			const rs = await topicsAPI.getRecentTopics({
				"page[limit]": pageLimit,
				sort: "-viewCount",
			});
			this.loading = false;
			if (rs) {
				this.topicsList = rs.data;
			}
		},
	},
};
</script>

<style>
</style>