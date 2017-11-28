"use strict";

import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../modules/home";
import Cvs from "../modules/cvs";
import Experiences from "../modules/experiences";
import Skills from "../modules/skills";
import Tools from "../modules/tools";
import Profile from "../modules/profile";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "hash",
    routes: [
        { path: "/", component: Home },
        { path: "/cv", component: Cvs, meta: { needRole: "admin" } },
        { path: "/experiences", component: Experiences, meta: { needRole: "admin" } },
        { path: "/skills", component: Skills, meta: { needRole: "admin" } },
        { path: "/tools", component: Tools, meta: { needRole: "admin" } },
        { path: "/profile", component: Profile }
        // { path: "/users", component: User, meta: { needRole: "admin" } },
        //{ path: "*", component: NotFound }
    ]
});