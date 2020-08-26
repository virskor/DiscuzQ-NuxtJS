<template>
	<v-overlay :value="value">
		<!--显示二维码-->
		<v-img v-if="img" :src="img" :lazy-src="img" class="grey lighten-2 rounded-lg clickable">
			<template v-slot:placeholder>
				<v-row class="fill-height ma-0" align="center" justify="center">
					<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
				</v-row>
			</template>
		</v-img>

		<!--关闭二维码-->
		<center>
			<br />
			<br />
			<v-btn icon @click="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</center>
	</v-overlay>
</template>

<script>
import wechatAPI from "~/api/wechat";

export default {
	props: {
		/**
		 * 是否显示
		 */
		value: Boolean,
	},
	data() {
		return {
			/**
			 * 用于查询微信扫码登录状态
			 */
			scene_str: null,
			/**
			 * 生成的用于扫描的二维码地址
			 */
			img: null,
		};
	},
	methods: {
		/**
		 * 关闭微信登录
		 */
		close() {
			this.$emit("input", false);
		},

		/**
		 * 加载二维码
		 */
		async getWechatQrCode() {
			const rs = await wechatAPI.getQRcode();
			if (rs) {
				this.img = rs.data.attributes.img;
                this.scene_str = rs.data.attributes.scene_str;

                /**
                 * 自动查询用户登录状态
                 */
                this.wechatLoginStatusEnroll();
			}
		},

		/**
		 * 自动查询登录状态
		 *
		 * 该方法为状态管理方法，当wechatLogin执行成功后进行回调
		 */
		wechatLoginStatusEnroll() {},
	},

	watch: {
		async value() {
			if (this.value) {
				await this.getWechatQrCode();
			}
		},
	},
};
</script>

<style>
</style>