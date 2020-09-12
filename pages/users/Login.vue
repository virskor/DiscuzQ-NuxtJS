<template>
	<div class="loginForm">
		<AppTitle title="用户登录"></AppTitle>

		<v-container>
			<v-row align="center" justify="center">
				<v-col cols="12" sm="12" md="6">
					<v-card flat>
						<AppLogo :width="150" />
						<br />
						<v-toolbar color="transparent" flat>
							<v-toolbar-title>
								<h2 class="text--primary font-weight-black mt-5">登录{{forum.attributes.set_site.site_name}}</h2>
								<p class="text--secondary">用户名或密码登入</p>
							</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form>
								<v-text-field v-model="username" label="用户名" name="username" type="text"></v-text-field>

								<v-text-field v-model="password" id="password" label="密码" name="password" type="password"></v-text-field>
							</v-form>
						</v-card-text>
						<div class="loginFormActions">
							<p>
								如您
								<nuxt-link to="/users/reset">忘记密码</nuxt-link>点击来修改
							</p>
							<p>如果不是自己的计算机，请使用无痕模式来访问</p>
							<p>
								<v-btn :loading="loading" rounded depressed large block @click="login" color="primary">登录</v-btn>
							</p>
							<p>
								<v-btn
									depressed
									large
									rounded
									block
									@click="$router.push('/users/register')"
									color="default"
								>注册</v-btn>
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
import WechatLogin from "~/components/mixins/users/WechatLogin.mixins";
import AlreadyLoginNotice from "~/components/mixins/users/AlreadyLoginNotice.mixins";

export default {
	mixins: [WechatLogin, AlreadyLoginNotice],
	head() {
		return {
			title: "用户登录",
		};
	},
	data() {
		return {
			/**
			 * 用于登录的用户名
			 */
			username: "",
			/**
			 * 登录密码
			 */
			password: "",
			/**
			 * 登录按钮loading动画控制
			 */
			loading: false,
			/**
			 * 用于登录后回调到登录前要继续操作的页面
			 */
			callback: this.$route.query.callback,
			/**
			 * force
			 * 强制使用用户名密码登录
			 */
			force: this.$route.query.force,
		};
	},
	computed: {
		...mapGetters({
			appConf: types.GETTERS_APPCONF,
			forum: types.GETTERS_FORUM,
			user: types.GETTERS_USER,
		}),
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
	},
	beforeCreate() {
		this.$nextTick(async () => {
			const { registerClosed, force } = this;
			if (registerClosed && !force) {
				this.$router.push("/users/mobile");
			}
		});
	},
	mounted() {
		this.$nextTick(async () => {
			await this.alreadyLoginNotice();
		});
	},
	methods: {
		async login() {
			const { username, password } = this;
			if (!username || !password) {
				await this.$swal(
					"缺少必要参数!",
					"请先填写用户名和密码后再登录!",
					"error"
				);
				return;
			}

			this.loading = true;

			const hasLogined = await this.$store.dispatch("login", {
				username,
				password,
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
			this.loading = false;
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
