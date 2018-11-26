import Vue from "vue";
import toastr from "../../../core/toastr";
import { LOAD, ADD, SELECT, CLEAR_SELECT, UPDATE, REMOVE } from "./types";
import axios from "axios";
import _ from "lodash";

export const NAMESPACE = "/api/cvs";

export const selectRow = ({ commit }, row, multiSelect) => {
    commit(SELECT, row, multiSelect);
};

export const clearSelection = ({ commit }) => {
    commit(CLEAR_SELECT);
};

export const downloadUserCvs = ({ commit }, userId) => {
    axios.get(NAMESPACE).then((response) => {
        let res = response.data;
        console.log("got cvs of " + userId);
        if (res.status == 200 && res.data) {
            for (let cv of res.data) {
                let dict = {};

                for (let skill of cv.skills) {
                    if (!dict[skill.type])
                        dict[skill.type] = [skill];
                    else
                        dict[skill.type].push(skill);
                }

                cv.skills = dict;
                console.log("done cv: "+cv.title);
            }

            commit(LOAD, res.data);
        } else
            console.error("Request error!", res.error);
    }).catch((response) => {
        console.error("Request error!", response.error.message);
    });
};

export const saveRow = ({ commit }, model) => {
    axios.post(NAMESPACE, model).then((response) => {
        let res = response.data;

        if (res.status == 200 && res.data)
            created({ commit }, res.data, true);
    }).catch((response) => {
        if (response.error)
            toastr.error(response.error.message);
    });     
};

export const created = ({ commit }, row, needSelect) => {
    commit(ADD, row);
    if (needSelect)
        commit(SELECT, row, false);
};

export const updateRow = ({ commit }, row) => {
    axios.put(NAMESPACE + "/" + row.code, row).then((response) => {
        let res = response.data;
        if (res.data)
            commit(UPDATE, res.data);
    }).catch((response) => {
        if (response.error)
            toastr.error(response.error.message);
    }); 
};

export const updated = ({ commit }, row) => {
    commit(UPDATE, row);
};

export const removeRow = ({ commit }, row) => {
    axios.delete(NAMESPACE + "/" + row.code).then((response) => {
        commit(REMOVE, row);
    }).catch((response) => {
        if (response.error)
            toastr.error(response.error.message);
    });
};

export const removed = ({ commit }, row) => {
    commit(REMOVE, row);
};
