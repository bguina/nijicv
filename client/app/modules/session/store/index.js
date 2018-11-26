import { ADD_NOTIFICATION, SET_USER, SEARCH} from "./types";

const state = {
    user: null,
    notifications: [],
    searchText: ""
};

const mutations = {
    [ADD_NOTIFICATION] (state, item) {
        state.notifications.splice(0);
        state.notifications.push(item);
    },

    [SET_USER] (state, user) {
        state.user = user;
    },

    [SEARCH] (state, text) {
        state.searchText = text;
    }   

};

import * as getters from "./getters";
import * as actions from "./actions";

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};