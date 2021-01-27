import * as types from '@/store/vuex-types'
import consts from '~/utils/consts'

const state = () => {
    return {
        /**
         * 默认的配置项
         * 这些配置将被用户覆盖更新
         */
        appConf: {
            dark: false,
            appbarDark: false,
            appbarColor: null,
            removeChargedThreads: false,
            classicalTheme: false,
        }
    }
}

const getters = {
    [types.GETTERS_APPCONF]: state => state.appConf, /** token */
}

const mutations = {
    [types.MUTATION_APPCONF](state, appConf) {
        state.appConf = appConf;
    },
}


const actions = {
    /**
     * 更新应用配置
     * @param {*} param0 
     * @param {*} conf 
     */
    updateAppConf({ commit, state }, conf) {
        /**
         * 仅覆盖数据
         */
        const newAppConf = Object.assign({ ...state.appConf }, { ...conf });
        commit(types.MUTATION_APPCONF, newAppConf);
        localStorage.setItem(consts.STORAGE_APPCONF, JSON.stringify(newAppConf));
    },
    /**
     * 拉取应用配置
     * 仅在整个app启动时调用，将从本地加载现有配置覆盖当前的应用配置
     */
    bootstrapConfigs({ commit, state }) {
        let conf = localStorage.getItem(consts.STORAGE_APPCONF);

        if (!_.isEmpty(conf)) {
            try {
                conf = JSON.parse(conf);

                const newAppConf = Object.assign({ ...state.appConf }, { ...conf });
                commit(types.MUTATION_APPCONF, newAppConf);
            } catch (e) {
                console.error(e);
            }
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};