import Vue from "vue";
import { validators } from "vue-form-generator";

import { find } from "lodash";

let _ = Vue.prototype._;

module.exports = {

    id: "experiences",
    title: _("Experiences"),

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
                title: _("Status"),
                field: "status",
                formatter(value, model, col) {
                    return value ? "<i class='fa fa-check'/>" : "<i class='fa fa-ban'/>";
                },
                align: "center"
            },
            {
                title: _("Tags"),
                field: "tags"
            },
            {
                title: _("Position"),
                field: "position"
            },
            {
                title: _("Business"),
                field: "business"
            },
            {
                title: _("Started"),
                field: "startedAt"
            },
            {
                title: _("Ended"),
                field: "endedAt"
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
                type: "switch",
                label: _("Status"),
                model: "status",
                multi: true,
                default: 1,
                valueOn: 1,    
                valueOff: 0,
                textOn: _("Active"),
                textOff: _("Inactive")
            },
            {
                type: "input",
                inputType: "text",
                label: _("Tags"),
                model: "tags",
                multi: true,
                featured: false,
                required: false,
                placeholder: _("ExperienceTags"),
                validator: validators.array
            },
            {
                type: "input",
                inputType: "text",
                label: _("Position"),
                model: "position",
                featured: false,
                required: false,
                placeholder: _("ExperiencePosition"),
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("Business"),
                model: "business",
                placeholder: _("ExperienceBusiness"),
                validator: validators.string
            },
            {
                type: "input",
                inputType: "text",
                label: _("Started"),
                model: "startedAt",
                required: true,
                placeholder: _("ExperienceStartedAt"),
                validator: validators.string
            },
            {
                type: "input",
                inputType: "textArea",
                label: _("Ended"),
                model: "startedAt",
                placeholder: _("ExperienceEndedAt"),
                validator: validators.string
            },
            {
                type: "textArea",
                label: _("Description"),
                model: "description",
                featured: false,
                required: false,
                placeholder: _("ExperienceDescription"),
                validator: validators.string
            }
    /*        {
                type: "dateTimePicker",
                label: "started picker",
                model: "startedAt",
                required: true,
                placeholder: "User's birth of date",
                min: moment("1900-01-01").toDate(),
                max: moment("2016-01-01").toDate(),
                validator: validators.date,

                dateTimePickerOptions: {
                    format: "YYYY-MM-DD"
                },            

                onChanged: function(model, newVal, oldVal, field) {
                    model.startedAt = moment(newVal);
                }
            }*/
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
