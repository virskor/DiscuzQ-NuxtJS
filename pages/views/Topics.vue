<template>
	<div>
		<AppTitle hideExtendedNav title="话题">
			<!--搜索输入框-->
			<v-text-field
				v-model="keyword"
				solo-inverted
				flat
				dense
				rounded
				hide-details
				label="搜索话题"
				prepend-inner-icon="mdi-magnify"
				@keyup.enter="search"
			></v-text-field>

			<!--筛选按钮-->
			<TopicsFilter v-model="sort"></TopicsFilter>

			<!--搜索按钮-->
			<v-btn @click="search" icon color="primary" class="hidden-xs-only">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
		</AppTitle>

		<v-container class="scaffold">
			<!--话题列表-->
			<template>
				<!--没有可用的数据-->
				<EmptyBox v-if="$_.isEmpty(topics)" @requestRefresh="getTopicList" refresh></EmptyBox>

				<!--渲染话题列表-->
				<template v-for="(topic, i) in topics">
					<!--渲染列表-->
					<var-box :thread="mapRelatedThread(topic.relationships)" :key="i" v-slot="{ thread }">
						<TopicItemCard
							v-if="thread"
							:topic="topic"
							:firstPost="mapRelatedFirstPost(thread.relationships)"
							:attachments="mapAttachments(thread) || []"
							:thread="thread"
						></TopicItemCard>
					</var-box>
				</template>

				<!--分页组件-->
				<MorePage
					caption="加载更多"
					:loading="loading"
					@input="getTopicList"
					v-if="topicsList"
					:length="meta ? meta.pageCount : 1"
					v-model="pageNumber"
				></MorePage>
			</template>
		</v-container>
	</div>
</template>

<script>
import topicsAPI from "~/api/topics";
import TopicsFilter from "~/components/topics/TopicsFilter";
import TopicItemCard from "~/components/topics/TopicItemCard";

export default {
	head() {
		return {
			title: "话题列表",
		};
	},
	async asyncData({ app, params, error }) {

		app.head.title = "话题列表";

		try {
			const rs = await topicsAPI.getTopics({"page[number]": 1,"sort": "recommended"});
			if (!rs) {
				return error({
					statusCode: 502,
					message: "暂时无法查看，请刷新重试",
				});
			}

			return { topicsList: rs, meta: rs.meta };
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	data() {
		return {
			/**
			 * 模糊搜索
			 */
			keyword: "",
			/**
			 * 排序方式
			 */
			sort: "-viewCount",
			/**
			 * 页码
			 */
			pageNumber: 1,
			/**
			 * 话题列表数据
			 * 注意初始化时，将被async data 覆盖
			 */
			topicsList: [],
			/**
			 * loading
			 */
			loading: false,
			/**
			 * 分页数据
			 */
			meta: null,
		};
	},
	computed: {
		/**
		 * 话题数据
		 */
		topics() {
			const { topicsList } = this;
			return topicsList.data || [];
		},
	},
	methods: {
		/**
		 * 执行搜索
		 */
		search() {
			this.getTopicList();
		},
		/**
		 * 取得主题关联的附件
		 */
		mapAttachments(thread) {
			const { topicsList } = this;
			const firstPost = this.mapRelatedFirstPost(thread.relationships);
			if (!firstPost) {
				return [];
			}

			let firstPostImages = firstPost.relationships.images.data || [];
			firstPostImages = firstPostImages.map((it) => it.id); /// map出ID

			return topicsList.included.filter(
				(it) => it.id == firstPostImages.find((el) => el == it.id)
			);
		},
		/**
		 * 取得关联的主题
		 */
		mapRelatedThread(threadRelationships) {
			const { topicsList } = this;
			if (this.$_.isEmpty(threadRelationships.lastThread.data)) {
				return null;
			}
			const wantFindThreadID =
				threadRelationships.lastThread.data[0].id || 0;
			return topicsList.included.find(
				(el) => el.type == "threads" && el.id == wantFindThreadID
			);
		},
		/**
		 * 查询首贴
		 */
		mapRelatedFirstPost(threadRelationships) {
			const { topicsList } = this;
			const postID = threadRelationships.firstPost.data.id || 0;

			return topicsList.included.find(
				(el) => el.type == "posts" && el.id == postID
			);
		},
		/**
		 * get topic list
		 * 获取话题列表
		 */
		async getTopicList() {
			const { keyword, sort, pageNumber, topicsList } = this;

			this.loading = true;

			const rs = await topicsAPI.getTopics({
				sort,
				"filter[content]": keyword,
				"page[number]": pageNumber,
				"sort": "recommended"
			});

			this.loading = false;

			if (rs) {
				this.meta = rs.meta;

				if (!topicsList) {
					this.topicsList = rs;
					return;
				}

				if (!this.$_.isEmpty(rs.data)) {
					this.topicsList = {
						data: [...topicsList.data, ...rs.data],
						included: [...topicsList.included, ...rs.included],
					};
				}
			}
		},
	},
	components: {
		TopicsFilter,
		TopicItemCard,
	},
	watch: {
		sort(sort, oldSort) {
			if (sort != oldSort) {
				this.getTopicList();
			}
		},
	},
};
</script>

<style>
</style>