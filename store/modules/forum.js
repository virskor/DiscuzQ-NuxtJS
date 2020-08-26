import * as types from '@/store/vuex-types';
import forumAPI from '~/api/forum'

const state = () => {
    return {
        forum: null
    }
}

const getters = {
    [types.GETTERS_FORUM]: state => state.forum,
}

const mutations = {
    /**
     * 更新 forum 前端配置
     * @param {*} state 
     * @param {*} forum 
     */
    [types.MUTATION_FORUM](state, forum) {
        state.forum = forum;
    },
}


const actions = {
    /**
     * 获取论坛前端配置信息
     * @param {*} param0 
     */
    async getForum({ commit }) {
        let rs = await forumAPI.getForum();
        if (rs) {
            commit(types.MUTATION_FORUM, rs.data);
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