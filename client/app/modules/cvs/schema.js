import Vue from "vue";
import moment from "moment";
import { validators } from "vue-form-generator";

import { find } from "lodash";

let _ = Vue.prototype._;

module.exports = {

    id: "cvs",
    title: _("Cvs"),

    table: {
        multiSelect: true,
        columns: [
/*            {
                title: _("ID"),
                field: "code",
                align: "left",
                formatter(value, model) {
                    return model ? model.code : "";
                }
            },*/
            {
                title: _("Status"),
                field: "status",
                formatter(value, model, col) {
                    return value ? "<i class='fa fa-check'/>" : "<i class='fa fa-ban'/>";
                },
                align: "center"
            },
            {
                title: _("Name"),
                field: "name"
            },
            {
                title: _("Title"),
                field: "title"
            }
        ],
        rowClasses: function(model) {
            return {
                inactive: 0 == model.status
            };
        }
    },

    form: {
        fields: [
            {
                type: "input",
                inputType: "text",
                label: _("ID"),
                model: "code",
                readonly: true,
                disabled: true,
                multi: false,
                get(model) {
                    if (model.code)
                        return model.code;
                    else
                        return _("willBeGenerated");
                }
            },
            {
                type: "select",
                label: _("Status"),
                model: "status",
                required: true,
                values: function() {
                    return [
                        { id: 0, name: "Do not publish" },
                        { id: 1, name: "Publish" },
                    ];
                },
                default: 1,
                validator: validators.required
            }, 
            {
                type: "input",
                inputType: "text",
                label: _("Name"),
                model: "name",
                featured: true,
                required: true,
                placeholder: _("CvName"),
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("Title"),
                model: "title",
                featured: true,
                required: true,
                placeholder: _("CvTitle"),
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("Experiences"),
                model: "experiences",
                placeholder: _("CvExperiences"),
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("Formations"),
                model: "formations",
                placeholder: _("CvFormations"),
                validator: validators.string
            }
        ]
    },

    options: {
        searchable: true,

        enableNewButton: true,
        enabledSaveButton: true,
        enableDeleteButton: true,
        enableCloneButton: false,

        validateAfterLoad: false, // Validate after load a model
        validateAfterChanged: false, // Validate after every changes on the model
        validateBeforeSave: true // Validate before save a model
    },

    events: {
        onSelect: null,
        onNewItem: null,
        onCloneItem: null,
        onSaveItem: null,
        onDeleteItem: null,
        onChangeItem: null,
        onValidated(model, errors, schema) {
            if (errors.length > 0)
                console.warn("Validation error in page! Errors:", errors, ", Model:", model);
        }
    },

    resources: {
        addCaption: _("New"),
        saveCaption: _("Save"),
        cloneCaption: _("Clone"),
        deleteCaption: _("Delete")
    }

};

