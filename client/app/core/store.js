import Vue from "vue";
import Vuex from "vuex";

import session from "../modules/session/store";
import cvs from "../modules/cvs/store";
import experiences from "../modules/experiences/store";
import profile from "../modules/profile/store";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        session,
        cvs,
        experiences,
        profile
    }
});