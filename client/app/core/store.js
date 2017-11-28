import Vue from "vue";
import Vuex from "vuex";

import session from "../modules/session/store";
import cvs from "../modules/cvs/store";
import experiences from "../modules/experiences/store";
import skills from "../modules/skills/store";
import tools from "../modules/tools/store";
import profile from "../modules/profile/store";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        session,
        cvs,
        experiences,
        skills,
        tools,
        profile
    }
});