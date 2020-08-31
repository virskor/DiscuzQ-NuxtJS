import * as types from '@/store/vuex-types'
import siteInfoAPI from '~/api/siteInfo';

const state = () => {
    return {
        siteInfo: null,
    }
}

const getters = {
    [types.GETTERS_SITE_INFO]: state => state.siteInfo, /** token */
}

const mutations = {
    [types.MUTATION_SITE_INFO](state, siteInfo) {
        state.siteInfo = siteInfo;
    },
}


const actions = {
    /**
     * 获取站点信息
     * @param {*} param0 
     */
    async getSiteInfo({ commit }) {
        const rs = await siteInfoAPI.getSiteInfo();
        if (rs) {
            commit(types.MUTATION_SITE_INFO, rs.data);
            return true;
        }
        return false;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};