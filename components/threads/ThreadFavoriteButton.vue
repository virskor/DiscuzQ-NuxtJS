<template>
	<!--收藏-->
	<v-btn :loading="loading" color="transparent" @click="favorite" depressed>
		<i
			:class="`iconfont ${ isFavorite ? 'icon-collection-fill amber--text':'icon-collection'} icon-medium`"
		></i>
	</v-btn>
</template>

<script>
import threadsAPI from "~/api/threads";

export default {
	props: {
		/**
		 * 当前主题对象
		 */
		thread: Object,
	},
	computed: {
		/**
		 * 用户是否收藏了主题
		 */
		isFavorite() {
			const { thread, favorited } = this;
			if (!thread) {
				return false;
			}

			/**
			 * 本次是否操作过
			 * 否则取 thread 存储的收藏记录进行渲染
			 */
			if (favorited != null) {
				return favorited;
			}

			return thread.attributes.isFavorite || false;
		},
	},
	methods: {
		/**
		 * 收藏主题
		 */
		async favorite() {
			const { isFavorite, thread } = this;
			if (!thread) {
				return false;
			}

            this.loading = true;

            const rs = await threadsAPI.favorite(thread.id, !isFavorite);
            
            this.loading = false;
			if (rs) {
				this.favorited = rs.data.attributes.isFavorite;
			}
		},
	},
	data() {
		return {
			/**
			 * 如果用户本次点击过取消或者收藏，那么优先级最高
			 */
            favorited: null,
            /**
             * 处理中
             */
            loading: false
		};
	},
};
</script>

<style>
</style>