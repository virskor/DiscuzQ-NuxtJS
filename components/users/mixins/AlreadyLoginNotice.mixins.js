import * as types from "~/store/vuex-types";
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            user: types.GETTERS_USER,
        }),
        hasLogined() {
            const { user } = this;
            return !this.$_.isEmpty(user);
        },
    },
    methods: {
        async alreadyLoginNotice() {
            const { hasLogined } = this;
            if (hasLogined) {
                const result = await this.$swal({
                    title: "您已经登录",
                    text: "您已经登录，您可以退出当前账号或者返回首页",
                    icon: "info",
                    buttons: {
                        cancel: "返回首页",
                        catch: {
                            text: "退出当前账号!",
                        },
                    },
                    dangerMode: true,
                });

                if (result) {
                    await this.$store.dispatch('logout');
                    return;
                }

                this.$router.push('/');
            }
        }
    }
}