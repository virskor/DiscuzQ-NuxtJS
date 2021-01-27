<template>
  <div class="loginForm">
    <AppTitle title="忘记密码"></AppTitle>

    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="6">
          <v-card flat>
            <AppLogo :width="150" />
            <br />
            <v-toolbar color="transparent" flat>
              <v-toolbar-title>
                <h2 class="text--primary font-weight-black mt-5">
                  通过手机号找回密码
                </h2>
                <p class="text--secondary">使用手机号获取验证码来修改</p>
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

                <v-text-field
                  v-model="code"
                  id="code"
                  label="输入短信验证码"
                  name="code"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  label="新的密码"
                  name="password"
                  type="text"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <div class="loginFormActions">
              <p>
                如果没有账号，您可以
                <nuxt-link to="/users/register">注册</nuxt-link>
              </p>
              <p>如果不是自己的计算机，请使用无痕模式来访问</p>
              <p>
                <v-btn
                  :loading="loading"
                  depressed
                  large
                  rounded
                  outlined
                  block
                  @click="modify"
                  color="primary"
                  >修改</v-btn
                >
              </p>
              <p>
                <v-btn
                  depressed
                  large
                  block
                  rounded
                  outlined
                  @click="$router.push('/users/login')"
                  color="default"
                  >登录</v-btn
                >
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
import smsAPI from "~/api/sms";
import AlreadyLoginNotice from "~/components/mixins/users/AlreadyLoginNotice.mixins";

/**
 * sms verify type
 */
const smsVerifyType = "reset_pwd";

/**
 * default suffix
 */
const defaultSuffix = "发送验证码";

export default {
  mixins: [AlreadyLoginNotice],
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
      /**
       * 输入新的密码
       */
      password: "",
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
        await this.$swal("请填写手机号!", "请填写手机号在继续!", "error");
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
     * 修改密码
     * 修改密码使用更新用户资料的方式进行
     */
    async modify() {
      const { mobile, code, password } = this;
      if (!mobile || !code || !password) {
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
        password,
        type: smsVerifyType,
      };

      this.loading = true;

      const result = await smsAPI.verify(data);

      this.loading = false;

      if (result) {
        await this.$swal(
          "修改成功!",
          "修改成功，现在您可以继续登录!",
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
