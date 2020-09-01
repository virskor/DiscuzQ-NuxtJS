<template>
	<div :class="`thread-video ${block? 'fullbackground' : ''}`">
		<video
			v-if="showThreadVideo"
			:id="playerID"
			preload="auto"
			:class="`${block ? 'block': ''}`"
			playsinline
			webkit-playsinline
			:width="width"
			:height="height"
		>
		正在加载播放器，如果加载失败，请刷新...</video>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
	props: {
		/**
		 * 帖子关联视频模型
		 */
		threadVideo: Object,
		/**
		 * width
		 */
		width: String,
		/**
		 * height
		 */
		height: String,
		/**
		 * block
		 */
		block: Boolean,
	},
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
		}),
		/**
		 * thread video is available or not
		 */
		showThreadVideo() {
			const { forum, threadVideo } = this;

			if (!threadVideo) {
				return false;
			}

			const appID = forum.attributes.qcloud.qcloud_vod_sub_app_id || "";
			const fileID = threadVideo.attributes.file_id || "";

			if (!fileID || !appID) {
				return false;
			}

			return true;
		},
		/**
		 * playerID
		 */
		playerID() {
			const { threadVideo, showThreadVideo } = this;
			if (!showThreadVideo) {
				return;
			}
			return `player-container-${threadVideo.id || 0}`;
		},
	},
	mounted() {
		this.$nextTick(async () => {
			this.createPlayerInstance();
		});
	},
	beforeDestroy() {
		if (this.player) {
			this.player.dispose();
		}
	},
	data() {
		return {
			player: null,
		};
	},
	methods: {
		/**
		 * 创建播放器
		 */
		createPlayerInstance() {
			const { forum, threadVideo, showThreadVideo, playerID } = this;

			if (!showThreadVideo) {
				return;
			}

			const appID = forum.attributes.qcloud.qcloud_vod_sub_app_id || "";
			const fileID = threadVideo.attributes.file_id || "";

			this.player = new TCPlayer(playerID, {
				// player-container-id 为播放器容器 ID，必须与 html 中一致
				fileID, // 请传入需要播放的视频 filID（必须）
				appID, // 请传入点播账号的 appID（必须）
				flash: {
					swf: "/player.swf", //swf 文件地址（必须）
				},
				plugins: {
					ProgressMarker: true,
					//statistic: true,
					ContinuePlay: {
						// 开启续播功能
						// auto: true, //[可选] 是否在视频播放后自动续播
						// text:'上次播放至 ', //[可选] 提示文案
						// btnText: '恢复播放' //[可选] 按钮文案
					},
				},
			});
		},
	},
};
</script>

<style lang="less" scoped>
.thread-video {
	.block {
		width: 100%;
	}
	margin-top: -1px;
}
.fullbackground {
	background-color: #000000;
}
</style>