import Vue from "vue";
import { validators } from "vue-form-generator";

import { find } from "lodash";

let _ = Vue.prototype._;

module.exports = {

    id: "tools",
    title: _("Tools"),

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
                title: _("ThumbnailUrl"),
                field: "thumbnailUrl"
            },
            {
                title: _("Name"),
                field: "name"
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
                label: _("ThumbnailUrl"),
                model: "thumbnailUrl",
                placeholder: _("ToolThumbnailUrl"),
                required: true,
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("LinkUrl"),
                model: "linkUrl",
                placeholder: _("ToolLinkUrl"),
                required: true,
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("Name"),
                model: "name",
                placeholder: _("ToolName"),
                required: true,
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
