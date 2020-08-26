import * as types from '@/store/vuex-types'

const state = () => {
    return {
        filter: null,
    }
}

const getters = {
    [types.GETTERS_FILTER]: state => state.filter, /** token */
}

const mutations = {
    [types.MUTATION_FILTER](state, filter) {
        state.filter = filter;
    },
}


const actions = {
    /**
     * 更新filter
     * @param {*} param0 
     */
    updateFilter({ commit }, filters) {
        commit(types.MUTATION_FILTER, filters);
    },
    /**
     * reset filters to null
     */
    clearFilters({ commit }) {
        commit(types.MUTATION_FILTER, null);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};