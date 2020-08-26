import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

import WechatLoginScanner from '~/components/users/WechatLoginScanner';
import discuzConf from '~/discuz.config';

export default {
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
			user: types.GETTERS_USER,
		}),
		allowWechatLogin() {
			return discuzConf.thirdpartyAuth.wechat || false;
		}
	},
	data() {
		return {
			overlay: false,
		}
	},
	methods: {
		/**
		 * 使用微信登录
		 * 仅调取WechatLoginScanner 展示，其他逻辑均在 WechatLoginScanner 进行处理
		 */
		async wechatLogin() {
			this.overlay = true;

		},
	},
	components: {
		WechatLoginScanner
	}
}
