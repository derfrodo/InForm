import { configureStore } from "@reduxjs/toolkit";
// import { COMMON_ACTIONS_BASE } from "@src/common/redux";
// import { SEARCH_GENERAL_SETTINGS_ACTIONS } from "@src/steps/searchGeneralSettings/redux";
// import { SEARCH_MAPPINGS_ACTIONS } from "@src/steps/searchMappings/redux";
// import { CREATE_FORM_MODELLS_ACTIONS } from "@src/steps/createFormModells/redux";

import { reducer } from "./reducer";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            immutableCheck: false,
            // (See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)
            // (To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)
            serializableCheck: {
                // Ignore these action types
                // ignoredActions: [
                //     COMMON_ACTIONS_BASE.COMMON_SET_PROGRAMM,
                //     COMMON_ACTIONS_BASE.COMMON_SET_IN_FORM_SOURCE_FILES,
                //     SEARCH_MAPPINGS_ACTIONS.SEARCH_MAPPINGS_SET_MAPPINGS,
                //     SEARCH_GENERAL_SETTINGS_ACTIONS.SEARCH_GENERAL_SETTINGS_SET_GENERAL_SETTINGS,
                //     CREATE_FORM_MODELLS_ACTIONS.CREATE_FORM_MODELLS_SET_FORM_MODELLS
                // ],
                // Ignore these field paths in all actions
                // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredActionPaths: ["next"],
                ignoredPaths: [
                    "common",
                    "steps.mappingSearch.mappings",
                    "steps.generalSettings.generalSettings",
                    "steps.createFormModells.formModells",
                ],
            },
        }),
});
