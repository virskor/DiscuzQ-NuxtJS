<template>
	<div>
		<div>
			<v-row align="center">
				<v-col cols="6">
					<v-subheader>时下流行的话题</v-subheader>
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
						<v-list-item cols="6" class="pa-1" v-for="(topic, i) in topicsList" :key="i">
							<nuxt-link :to="`/topics/${topic.id}`">
								<v-chip class="clickable" outlined color="transparent" text-color="primary">
									<v-avatar color="primary" left>
										<i class="iconfont white--text icon-huati2"></i>
									</v-avatar>
									{{topic.attributes.content}}
								</v-chip>
							</nuxt-link>
						</v-list-item>
					</v-list>
				</template>
			</template>
		</div>
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