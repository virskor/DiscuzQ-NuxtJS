import * as types from '@/store/vuex-types';
import usersAPI from '~/api/users';
import smsAPI from '~/api/sms';
import Authorization from '~/utils/authorization';

const state = () => {
    return {
        user: null,
        loginUserID: null,
    }
}

const getters = {
    /**
     * 登录用户信息
     */
    [types.GETTERS_USER]: state => state.user,
    /**
     * 已经登录的用户ID
     */
    [types.GETTERS_LOGIN_USERID]: state => state.loginUserID,
}

const mutations = {
    /**
     * 更新登录用户信息
     * @param {*} state 
     * @param {*} user 
     */
    [types.MUTATION_USER](state, user) {
        state.user = user;
    },
    /**
     * 更新已经登录用户的ID
     * @param {*} state 
     * @param {*} userID 
     */
    [types.MUTATION_LOGIN_USERID](state, userID) {
        state.loginUserID = userID;
    },
}


const actions = {
    /**
     * 
     * 登录请求仅交换accessToken
     * user更新将为独立的方式
     * this.$store.dispatch('getCurrentUser')
     * @param {*} param 
     * @param {*} data 
     */
    async login({ commit }, data) {
        const rs = await usersAPI.login(data);
        if (rs) {
            new Authorization().setAccessToken(rs.data);
            commit(types.MUTATION_LOGIN_USERID, rs.data.id);
            return true;
        }

        return false;
    },

    /**
     * 获取当前登录的用户信息
     * 用户信息是指当前登录的用户
     * 
     * fromLocal 是否是从本地 localstorage中初始化
     */
    async getCurrentUser({ commit, state }, { fromLocal }) {
        let rs;

        if (!fromLocal) {
            rs = await usersAPI.getUser(state.loginUserID);
        } else {
            /**
             * 如果没有access token 存储在本地那么直接返回好了
             * 因为用户之前没有登陆过
             */
            const getAccessToken = new Authorization().getAccessToken();
            if (_.isEmpty(getAccessToken)) {
                return false;
            }

            rs = await usersAPI.getUser(getAccessToken.id);
        }


        if (rs) {
            commit(types.MUTATION_USER, rs.data);
            return true;
        }
        return false;
    },

    /**
     * 
     * @param {*} param0 
     * @param {*} data 
     */
    updateCurrentUser({ commit}, {user}){
        if(_.isEmpty(user)){
            return false;
        }

        commit(types.MUTATION_USER, user);
    },

    /**
     * 使用短信验证码登录
     * 注意：
     * data包含 mobile, code, type
     * 这个方法实际上是用sms verify完成的，具体参考组件 pages/users/mobile.vue 中的vuerify传入值
     * @param {*} param0 
     * @param {*} data 
     */
    async loginBySMS({ commit }, data) {
        const rs = await smsAPI.verify(data);
        if (rs) {
            new Authorization().setAccessToken(rs.data);
            commit(types.MUTATION_LOGIN_USERID, rs.data.id);
            return true;
        }

        return false;
    },


    /**
     * 登出
     * 用户退出时要进行以下操作
     * 1，清空存储的认证信息
     * 2，移除当前用户的登录状态
     */
    async logout({ commit }) {
        new Authorization().clear();
        commit(types.MUTATION_USER, null);
        commit(types.MUTATION_LOGIN_USERID, null);
    },

    /**
     * shoudLogin
     */
    shouldLogin({state}){
        /**
         * 仅在客户端模式下检测是否已经登录
         */
        if(!process.client){
            return;
        }

        if(state.user == null){
            this.$router.push('/users/login');
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};