import * as types from '@/store/vuex-types'
import categoriesAPI from '~/api/categories';

const state = () => {
    return {
        categories: [],
    }
}

const getters = {
    [types.GETTERS_CATEGORIES]: state => state.categories, /** token */
}

const mutations = {
    [types.MUTATION_CATEGORIES](state, categories) {
        state.categories = categories || [];
    },
}


const actions = {
    /**
     * 获取站点的分类列表
     * @param {*} param0 
     */
    async getCategories({ commit }) {
        let rs = await categoriesAPI.getCategories();
        if (rs) {
            let cats = rs.data || [];
            const catsAll = {
                type: "categories",
                id: "0",
                attributes: {
                    name: "全部",
                    description: "前端默认分类",
                    icon: "",
                    sort: 1,
                    property: 0,
                    thread_count: 0,
                    ip: "127.0.0.1",
                    created_at: "",
                    updated_at: "",
                    canViewThreads: true,
                    canCreateThread: true,
                    canReplyThread: true
                }
            };
            cats.unshift(catsAll)
            
            commit(types.MUTATION_CATEGORIES, cats);
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