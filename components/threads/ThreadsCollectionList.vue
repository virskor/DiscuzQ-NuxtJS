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
					<v-card flat tile>
						<v-card-title>{{!meta ? 0 : meta.threadCount}}个收藏</v-card-title>
					</v-card>
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
					@input="getFavorites"
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

	mounted() {
		this.$nextTick(async () => {
			this.getFavorites();
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
		async getFavorites() {
			const { pageNumber, threadsData } = this;
			this.loading = true;

			const rs = await threadsAPI.favorites({
				"filter[isApproved]": 1,
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
	},

	components: {
		ThreadCard,
	},
};
</script>

<style>
</style>