import { combineReducers } from "@reduxjs/toolkit";

import { commonReducer } from "../common/redux";
import { searchMappingsReducer } from "../steps/searchMappings/redux";
import { searchGeneralSettingsReducer } from "../steps/searchGeneralSettings/redux";
import { createFormModellsReducer } from "../steps/createFormModells/redux";
import { initializeTemplatingReducer } from "../steps/initializeTemplating/redux";
import { resolveTemplateModelsReducer } from "@src/steps/resolveTemplateModels/redux";

export const reducer = combineReducers({
    common: commonReducer,
    steps: combineReducers({
        mappingSearch: searchMappingsReducer,
        generalSettings: searchGeneralSettingsReducer,
        createFormModells: createFormModellsReducer,
        initializeTemplating: initializeTemplatingReducer,
        resolveTemplateModels: resolveTemplateModelsReducer,
    }),
});
