import Vue from "vue";
import { validators } from "vue-form-generator";

import { find } from "lodash";

let _ = Vue.prototype._;

module.exports = {

    id: "skills",
    title: _("Skills"),

    table: {
        multiSelect: true,
        columns: [
            {
                title: _("ID"),
                field: "code",
                align: "left",
                formatter(value, model) {
                    return model ? model.code : "";
                }
            },
            {
                title: _("Type"),
                field: "type"
            },
            {
                title: _("Name"),
                field: "Name"
            }
        ],
        rowClasses: function(model) {
            return {
                inactive: false
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
                type: "input",
                inputType: "text",
                label: _("Type"),
                model: "type",
                placeholder: _("SkillType"),
                required: true,
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("Name"),
                model: "name",
                placeholder: _("SkillName"),
                required: true,
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("Tools"),
                model: "tools",
                placeholder: _("SkillTools"),
                validator: validators.array
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
