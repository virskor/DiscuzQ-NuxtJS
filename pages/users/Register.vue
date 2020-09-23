<template>
	<div class="registerForm">
		<AppTitle title="注册"></AppTitle>

		<v-container>
			<v-row v-if="registerClosed" align="center" justify="center">
				<v-alert dense type="info">注册服务暂停</v-alert>
			</v-row>

			<v-row v-else align="center" justify="center">
				<v-col cols="12" sm="8" md="6">
					<v-card flat>
						<AppLogo :width="150" />
						<br />
						<v-toolbar color="transparent" flat>
							<v-toolbar-title>
								<h2 class="text--primary font-weight-black mt-5">注册{{forum.attributes.set_site.site_name}}</h2>
								<p class="text--secondary">使用用户名密码来注册</p>
							</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form>
								<v-text-field v-model="username" label="用户名" name="username" type="text"></v-text-field>

								<v-text-field v-model="password" id="password" label="密码" name="password" type="password"></v-text-field>
							</v-form>
						</v-card-text>
						<div class="registerFormActions">
							<p>
								注册代表您同意
								<a href="https://app.clodra.com/policies/privacy.html" target="_blank">隐私政策</a>
								和
								<a href="https://app.clodra.com/policies/policy.html" target="_blank">用户协议</a>
							</p>
							<p>
								<v-btn :loading="loading" depressed large block @click="register" color="primary">注册</v-btn>
							</p>
							<p>
								<v-btn
									depressed
									large
									block
									@click="$router.push('/users/login')"
									color="default"
								>返回登陆</v-btn>
							</p>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";
import Captcha from "~/utils/captcha";
import usersAPI from "~/api/users";

export default {
	head() {
		return {
			title: "用户名密码注册",
		};
	},
	data() {
		return {
			/**
			 * 用于注册的用户名
			 */
			username: "",
			/**
			 * 注册密码
			 */
			password: "",
			/**
			 * 注册按钮loading动画控制
			 */
			loading: false,
		};
	},
	computed: {
		...mapGetters({
			appConf: types.GETTERS_APPCONF,
			forum: types.GETTERS_FORUM,
			user: types.GETTERS_USER,
		}),
		/**
		 * 注册时是否必要启动腾讯云验证码
		 * 视后端是否开启而进行
		 */
		registerRequiredCaptcha() {
			const { forum } = this;

			if (!forum) {
				return false;
			}

			return forum.attributes.set_reg.register_captcha;
		},

		/**
		 * register closed
		 */
		registerClosed() {
			const { forum } = this;

			if (!forum) {
				return false;
			}

			return forum.attributes.set_reg.register_close;
		},

		/**
		 * Captcha App ID
		 */
		captchaAppID() {
			const { forum } = this;
			return forum.attributes.qcloud.qcloud_captcha_app_id;
		},
	},
	beforeCreate() {
		this.$nextTick(async () => {
			const { registerClosed } = this;
			if (registerClosed) {
				this.$router.push("/users/mobile");
			}
		});
	},
	methods: {
		/**
		 * 执行注册
		 */
		async register() {
			const { username, password, registerRequiredCaptcha } = this;

			if (!username || !password) {
				await this.$swal(
					"请填写信息!",
					"请填写用户名密码后再继续注册!",
					"error"
				);
				return;
			}

			this.loading = true;

			let captchaResult;

			if (registerRequiredCaptcha) {
				try {
					captchaResult = await this.requestUserCaptcha();
				} catch (err) {
					console.log(err);
					this.loading = false;
					return;
				}
			}

			const result = await usersAPI.register({
				username,
				password,
				// todo: 虽然开启了验证码，实际上未校验。注册接口
				// ...captchaResult
			});

			this.loading = false;

			if (result) {
				/**
				 * 注册成功，提示用户，并返回登录页面
				 */

				await this.$swal(
					"注册成功!",
					"现在可以前去登录您的账号!",
					"success"
				);
				this.$router.push("/users/login");
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
	},
};
</script>

<style lang="less" scoped>
.registerForm {
	.registerFormActions {
		padding: 16px;
	}
}
</style>
