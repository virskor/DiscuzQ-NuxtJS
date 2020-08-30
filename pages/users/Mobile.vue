<template>
	<div class="loginForm">
		<AppTitle title="短信验证码登录"></AppTitle>

		<v-container fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" sm="12" md="6">
					<v-card flat>
						<AppLogo :width="150" />
						<br />
						<v-toolbar color="transparent" flat>
							<v-toolbar-title>
								<h2 class="text--primary font-weight-black mt-5">短信登录{{forum.attributes.set_site.site_name}}</h2>
								<p class="text--secondary">用户名或密码登入</p>
							</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form>
								<v-text-field
									v-model="mobile"
									label="手机号"
									name="mobile"
									type="text"
									:append-outer-icon="sendSMSEnabled ? 'mdi-send' : null"
									:suffix="suffix"
									:clearable="sendSMSEnabled"
									@click:append-outer="sendSMS"
								></v-text-field>

								<v-text-field v-model="code" id="code" label="输入短信验证码" name="code" type="text"></v-text-field>
							</v-form>
						</v-card-text>
						<div class="loginFormActions">
							<p>
								使用
								<nuxt-link :to="{ path: '/users/login', query: { force: true }}">用户名密码</nuxt-link>来登录
							</p>
							<p>如果不是自己的计算机，请使用无痕模式来访问</p>
							<p>
								<v-btn :loading="loading" rounded depressed large block @click="verify" color="primary">登录</v-btn>
							</p>
							<p align="center" v-if="!$C.isMobile() && allowWechatLogin">
								<v-btn rounded depressed large icon @click="wechatLogin" dark color="green">
									<i class="iconfont icon-weixin1"></i>
								</v-btn>
							</p>
						</div>
					</v-card>
				</v-col>
			</v-row>
			<WechatLoginScanner v-if="allowWechatLogin" v-model="overlay"></WechatLoginScanner>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";
import Captcha from "~/utils/captcha";
import smsAPI from "~/api/sms";
import WechatLogin from "~/components/users/mixins/WechatLogin.mixins";
import AlreadyLoginNotice from "~/components/users/mixins/AlreadyLoginNotice.mixins";

/**
 * sms verify type
 */
const smsVerifyType = "login";

/**
 * default suffix
 */
const defaultSuffix = "发送验证码";

export default {
	mixins: [WechatLogin, AlreadyLoginNotice],
	head() {
		return {
			title: "使用短信验证码登录",
		};
	},
	data() {
		return {
			/**
			 * 手机号
			 */
			mobile: "",
			/**
			 * 验证码
			 */
			code: "",
			/**
			 * 登录按钮loading动画控制
			 */
			loading: false,
			/**
			 * suffix
			 * 验证码成功发送后，将被启用倒计时
			 */
			suffix: defaultSuffix,
			/**
			 * 是否允许发送短信
			 * 如果已经点击，那么必须在倒计时后再允许继续发送
			 */
			sendSMSEnabled: true,
		};
	},
	computed: {
		...mapGetters({
			forum: types.GETTERS_FORUM,
			user: types.GETTERS_USER,
		}),
		/**
		 * Captcha App ID
		 */
		captchaAppID() {
			const { forum } = this;
			return forum.attributes.qcloud.qcloud_captcha_app_id;
		},
	},
	mounted() {
		this.$nextTick(async () => {
			await this.alreadyLoginNotice();
		});
	},
	methods: {
		/**
		 * 发送短信验证码
		 */
		async sendSMS() {
			const { mobile, captchaAppID } = this;
			if (!mobile) {
				await this.$swal(
					"请填写手机号!",
					"请填写手机号在继续!",
					"error"
				);
				return;
			}

			/**
			 * 如果配置了腾讯云验证码则要弹出
			 */
			let captchaResult;
			if (captchaAppID) {
				try {
					captchaResult = await this.requestUserCaptcha();
				} catch (err) {
					console.error(err);
					this.loading = false;
					return;
				}
			}

			/**
			 * 构造用于提交的数据
			 */
			let data = {
				mobile,
				type: smsVerifyType,
			};

			/**
			 * 开启了验证码，则要补全参数
			 */
			if (captchaResult) {
				data = {
					...data,
					captcha_ticket: captchaResult.ticket || "",
					captcha_rand_str: captchaResult.randstr || "",
				};
			}

			/**
			 * 尝试发送验证码
			 * 验证码发送后，要禁用发送按钮，并开启倒计时效果，待计时完成后在允许继续发送
			 */
			const result = await smsAPI.send(data);
			if (result) {
				this.waitToSendSMS(result.data.attributes.interval);
			}
		},
		/**
		 * 执行verify请求，执行请求会获得新的accesstoken
		 * 该请求完成后，执行获取current user
		 *
		 * 该请求 执行 vuex 中的 loginBySMS 存储accessToken, 之后再 getCurrentUser
		 */
		async verify() {
			const { mobile, code } = this;
			if (!mobile || !code) {
				await this.$swal(
					"缺少必要参数!",
					"请先填写手机号和短信验证码后再登录!",
					"error"
				);
				return;
			}

			/**
			 * 构造用于提交的数据
			 */
			let data = {
				mobile,
				code,
				type: smsVerifyType,
			};

			this.loading = true;

			const hasLogined = await this.$store.dispatch("loginBySMS", {
				...data,
			});

			this.loading = false;

			/**
			 * 未登录成功，不在继续操作
			 */
			if (!hasLogined) {
				return;
			}

			/**
			 * 登录成功后，执行一次获取登录用户的操作
			 */
			const result = await this.$store.dispatch("getCurrentUser", {
				fromLocal: false,
			});
			if (result) {
				/// todo: 处理登录后的操作，即redirect
				this.$router.push("/");
			}
		},
		/**
		 * request user captcha actions
		 * return object
		 */
		async requestUserCaptcha() {
			const { captchaAppID } = this;

			if (!captchaAppID) {
				return null;
			}

			try {
				const captcha = new Captcha({
					appId: captchaAppID,
				});
				const res = await captcha.showCaptcha();
				return res;
			} catch (err) {
				throw err;
			}
		},
		/**
		 * wait to send sms
		 * 等待重新发送验证码的许可
		 */
		waitToSendSMS(smsDuration) {
			this.sendSMSEnabled = false;
			let smsDurationCaption = smsDuration || 60;

			const lock = setInterval(() => {
				smsDurationCaption--;
				this.suffix = `${smsDurationCaption}秒后重新发送`;

				if (smsDurationCaption === 0) {
					this.sendSMSEnabled = true;
					this.suffix = defaultSuffix;
					clearInterval(lock);
				}
			}, 1000);
		},
	},
};
</script>

<style lang="less" scoped>
.loginForm {
	.loginFormActions {
		padding: 16px;
	}
}
</style>
