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
			<template>
				<!--帖子列表-->
				<v-list v-if="!$_.isEmpty(threadsData)">
					<ThreadCard
						v-for="(thread, i) in threadsData.data"
						:key="i"
						:thread="thread"
						:user="mapRelatedUser(thread)"
						:firstPost="mapFirstPost(thread)"
						:attachments="mapAttachments(thread)"
						:threadVideo="mapThreadVideo(thread)"
					></ThreadCard>
				</v-list>

				<!--没有数据-->
				<EmptyBox :refresh="false" v-else-if="!loading"></EmptyBox>

				<!--分页组件-->
				<MorePage
					caption="加载更多"
					:loading="loading"
					@input="getThreads"
					v-if="threadsData"
					:length="meta ? meta.pageCount : 1"
					v-model="pageNumber"
				></MorePage>
			</template>
		</div>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";
import threadsAPI from "~/api/threads";
import _ from "lodash";

import ThreadCard from "~/components/threads/ThreadCard";

export default {
	props: {
		/**
		 * 传入分类
		 */
		category: Object,
		/**
		 * 筛选仅用户ID
		 */
		filterUserID: String,
		/**
		 * 模糊查询
		 */
		keyword: String,
		/**
		 * topicId 关联话题ID
		 */
		topicID: String,
	},

	computed: {
		...mapGetters({
			filter: types.GETTERS_FILTER,
		}),
	},
	data() {
		return {
			/**
			 * pageNumber
			 */
			pageNumber: 1,
			/**
			 * threads data
			 * 话题列表数据
			 */
			threadsData: null,
			/**
			 * 是否正在加载
			 */
			loading: false,
			/**
			 * 分页数据
			 */
			meta: null,
		};
	},
	beforeDestroy(){
		this.threadsData = null;
	},
	mounted() {
		this.$nextTick(async () => {
			this.getThreads();
		});
	},

	methods: {
		/**
		 * 取得关联的发布人
		 */
		mapRelatedUser(thread) {
			const { threadsData } = this;
			return threadsData.included.find(
				(it) =>
					it.type == "users" &&
					it.id == thread.relationships.user.data.id
			);
		},
		/**
		 * 取出首帖
		 */
		mapFirstPost(thread) {
			const { threadsData } = this;
			return threadsData.included.find(
				(it) =>
					it.type == "posts" &&
					it.id == thread.relationships.firstPost.data.id
			);
		},
		mapThreadVideo(thread) {
			const { threadsData } = this;
			if (this.$_.isEmpty(thread.relationships.threadVideo)) {
				return null;
			}
			return threadsData.included.find(
				(it) =>
					it.type == "thread-video" &&
					it.id == thread.relationships.threadVideo.data.id
			);
		},
		/**
		 * 取得主题关联的附件
		 */
		mapAttachments(thread) {
			const { threadsData } = this;
			const firstPost = this.mapFirstPost(thread);
			if (!firstPost) {
				return [];
			}
			let firstPostImages = firstPost.relationships.images.data || [];
			firstPostImages = firstPostImages.map((it) => it.id); /// map出ID

			return threadsData.included.filter(
				(it) => it.id == firstPostImages.find((el) => el == it.id)
			);
		},
		/**
		 * 请求主题列表
		 */
		async getThreads() {
			const {
				filter,
				category,
				pageNumber,
				filterUserID,
				keyword,
				threadsData,
				topicID,
			} = this;
			const keys = Object.keys(filter);
			let data = {};

			keys.map(function (it) {
				let obj = {};
				obj[`filter[${it}]`] = filter[it];
				return Object.assign(data, obj);
			});

			/**
			 * 如果组件传入了 传入的category
			 * 那么将要强制将 filter[categoriesID] 设置为 传入的 category
			 *
			 * 还有一种情况，如果路由的 typeof categoryID != undefined
			 */
			if (category) {
				data["filter[categoryId]"] = category.id;
			}

			/**
			 * 筛选
			 */
			if (filterUserID) {
				data["filter[userId]"] = filterUserID;
			}

			/**
			 * 筛选关键字
			 */
			if (keyword) {
				data["filter[q]"] = keyword;
			}

			/**
			 * 关联话题
			 */
			if (topicID) {
				data["filter[topicId]"] = topicID;
			}

			this.loading = true;

			const rs = await threadsAPI.getThreads({
				...data,
				"page[number]": pageNumber,
			});

			this.loading = false;

			if (rs) {
				this.meta = rs.meta;
				if (!threadsData) {
					this.threadsData = rs;
					return;
				}

				if (!this.$_.isEmpty(rs.data)) {
					this.threadsData = {
						data: [...threadsData.data, ...rs.data],
						included: [...threadsData.included, ...rs.included],
					};
				}
			}
		},
		/**
		 * 返回顶部
		 */
		gotop() {
			const gotop = document.getElementById("goTop");
			if (gotop) {
				gotop.click();
			}
		},
	},

	watch: {
		/**
		 * 传入的category发生变化，重新加载
		 */
		category(cat, oldCat) {
			if (cat != oldCat) {
				this.getThreads();
			}
		},
		/**
		 * 筛选器变化
		 */
		filter() {
			this.getThreads();
		},
		/**
		 * 关键字变化
		 */
		keyword: _.debounce(function (w) {
			if (w) {
				this.threadsData = null;
				this.pageNumber = 1;
				this.getThreads();
			}
		}, 500),
	},

	components: {
		ThreadCard,
	},
};
</script>

<style>
</style>