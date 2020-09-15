import * as types from '@/store/vuex-types'
import attachmentsAPI from "~/api/attachments";

const defaultEditorData = { title: '', attachments: [], content: '' };

const state = () => {
    return {
        editor: {
            ...defaultEditorData
        },
    }
}

const getters = {
    [types.GETTERS_EDITOR]: state => state.editor, /** token */
}

const mutations = {
    [types.MUTATION_EDITOR](state, editor, notKeepAlive) {
        /**
         * 如果不基于原有状态更新
         */
        if (notKeepAlive) {
            state.editor = editor;
            return;
        }

        /**
         * 使用传入的属性，覆盖现有的状态
         */
        const newEditor = Object.assign({ ...state.editor }, { ...editor });
        state.editor = newEditor;
    },
}


const actions = {
    /**
     * 更新标题
     * @param {*} param0 
     * @param {*} attachment 
     */
    updateTitle({commit }, title) {
        commit(types.MUTATION_EDITOR, {
            title
        });
    },
    /**
     * 更新内容
     * @param {*} param0 
     * @param {*} attachment 
     */
    updateContent({commit }, content) {
        commit(types.MUTATION_EDITOR, {
            content
        });
    },
    /**
     * 增加附件
     * @param {*} param0 
     * @param {*} param1 
     */
    addAttachment({ state, commit }, attachment) {
        if (_.isEmpty(attachment)) {
            return;
        }

        commit(types.MUTATION_EDITOR, {
            attachments: [
                ...state.editor.attachments,
                {
                    ...attachment
                }
            ]
        });
    },

    /**
     * 移除附件
     * @param {*} param0 
     * @param {*} param1 
     */
    async removeAttachment({ state, commit }, attachment) {
        if (_.isEmpty(attachment)) {
            return;
        }

        const attachments = state.editor.attachments;

        await attachmentsAPI.delete(attachment);

        commit(types.MUTATION_EDITOR, {
            attachments: attachments.filter((el) => el.id != attachment.id)
        });
    },

    /**
     * 清空编辑器
     */
    clearEditor({ commit }) {
        commit(
            types.MUTATION_EDITOR,
            {
                ...defaultEditorData
            },
            true
        );
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};