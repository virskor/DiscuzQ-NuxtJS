<template>
	<v-card :ripple="false" elevation="0" class="topic-card pa-2 mb-2 " :id="`topic-${topic.id}`">
		<!--话题标题-->
		<v-card-title>
			<v-list-item class="pa-0">
				<v-list-item-content class="pa-0">
					<v-list-item-title @click="$router.push(`/topics/${topic.id}`)" class="headline">
						<span
							class="text-h5 primary--text clickable font-weight-black topic-title"
						>#{{topic.attributes.content || ""}}#</span>
					</v-list-item-title>
					<v-list-item-subtitle>最近发布：{{$C.formatDateTime(topic.attributes.updated_at)}}</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn @click="$router.push(`/topics/${topic.id}`)" color="primary" text>详情</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-card-title>

		<!--内容主题-->
		<ThreadContents
			v-if="thread"
			class="pl-4 pr-5 pb-2"
			isFloor
			:thread="thread"
			:firstPost="firstPost"
		></ThreadContents>

		<!--附件-->
		<AttachmentImages class="pl-5 pr-5" grid :attachments="attachments"></AttachmentImages>

		<!--话题热度概览-->
		<p class="v-list-item__subtitle pl-4">
			<span>热度：{{topic.attributes.view_count || 0}}</span>
			<span>内容：{{topic.attributes.thread_count || 0}}</span>
		</p>
	</v-card>
</template>

<script>
import ThreadContents from "~/components/threads/ThreadContents";
import AttachmentImages from "~/components/attachments/AttachmentImages";

export default {
	props: {
		/**
		 * 话题模型
		 */
		topic: Object,
		/**
		 * 主题模型
		 */
		thread: Object,
		/**
		 * 首贴
		 */
		firstPost: Object,
		/**
		 * 关联的附件
		 */
		attachments: Array,
	},
	components: {
		ThreadContents,
		AttachmentImages,
	},
};
</script>

<style lang="less">
.topic-card {
	border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
	.topic-title {
		white-space: initial;
		overflow: hidden;
	}
}
</style>