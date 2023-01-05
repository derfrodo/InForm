import { getCreateFormModellsDefaultState } from "@src/steps/createFormModells/redux";
import { getInitializeTemplatingDefaultState } from "@src/steps/initializeTemplating/redux";
import { getResolveTemplateModelsDefaultState } from "@src/steps/resolveTemplateModels/redux";
import { getSearchGeneralSettingsDefaultState } from "@src/steps/searchGeneralSettings/redux";
import { getSearchMappingsDefaultState } from "@src/steps/searchMappings/redux";
import { GeneratorState } from "./GeneratorState";

/**
 * For Testing ;)
 */

export function createStateStepsDefaults(): GeneratorState["steps"] {
    const result: GeneratorState["steps"] = {
        generalSettings: getSearchGeneralSettingsDefaultState(),
        mappingSearch: getSearchMappingsDefaultState(),
        createFormModells: getCreateFormModellsDefaultState(),
        initializeTemplating: getInitializeTemplatingDefaultState(),
        resolveTemplateModels: getResolveTemplateModelsDefaultState(),
    };
    return result;
}
