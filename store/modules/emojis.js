import * as types from '@/store/vuex-types'
import emojisAPI from '~/api/emojis';

const state = () => {
    return {
        emojis: [],
    }
}

const getters = {
    [types.GETTERS_EMOJIS]: state => state.emojis,
}

const mutations = {
    [types.MUTATION_EMOJIS](state, emojis) {
        state.emojis = emojis;
    },
}


const actions = {
    /**
     * 获取表情
     * @param {*} param0 
     */
    async getEmojis({state, commit }) {
        /**
         * 无需重复加载
         */
        if(!_.isEmpty(state.emojis)){
            return;
        }

        const rs = await emojisAPI.getEmojis();
        if (rs) {
            commit(types.MUTATION_EMOJIS, rs.data);
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