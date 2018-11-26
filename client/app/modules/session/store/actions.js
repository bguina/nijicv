import Vue from "vue";
import axios from "axios";
import { ADD_NOTIFICATION, SET_USER, SEARCH } from "./types";

export const NAMESPACE= "/api/session";

export const getSessionUser = ({ commit }) => {
    axios.get(NAMESPACE + "/me").then((response) => {
        let res = response.data;
        if (res.status == 200) {
            console.log("commit user " + JSON.stringify(res.data));
            commit(SET_USER, res.data);
        } else
            console.error("Request error!", res.error);

    }).catch((response) => {
        console.error("Request error!", response.statusText);
    });
};

export const addNotification = ({ commit }, item) => {
    commit(ADD_NOTIFICATION, item);
};

export const searching = ({ commit }, text) => {
    commit(SEARCH, text);
};
