import { store } from "@src/globalState";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { createFormModellsActionCreators } from "./redux";
import { FormModell } from "./types/FormModell";
import { MappedSymbolForPropertyFromGeneralSetting } from "./types/MappedSymbolForPropertyFromGeneralSetting";
import { getMappedInputProperties } from "./utils/getMappedInputProperties";
import { getMappedDetailsProperties } from "./utils/getMappedDetailsProperties";
import { getMappingSymbolsFromGeneralSettingsMappings } from "./utils/getMappingSymbolsFromGeneralSettingsMappings";
import { getMappedDetailsMembers } from "./utils/getMappedDetailsMembers";
import { getMappedInputMembers } from "./utils/getMappedInputMembers";
import { getGeneralSettingsFromState } from "../searchGeneralSettings/utils/getGeneralSettingsFromState";

export async function createFormModells(): Promise<FormModell[]> {
    const log = getGeneratorLogger();
    log.info("Create modells...");

    const { getState, dispatch } = store;
    const state = getState();
    const generalSettings = getGeneralSettingsFromState();
    const { argumentDeclarations } = generalSettings;

    // const generalSettingsMappings = argumentDeclarations.mappingType.properties || [];
    const filename = argumentDeclarations.mappingType.sourceFile?.fileName;
    if (!filename) {
        throw new Error("No sourcefile for type mappings found");
    }

    const mappedSymbols: MappedSymbolForPropertyFromGeneralSetting[] =
        await getMappingSymbolsFromGeneralSettingsMappings(generalSettings);

    const results: FormModell[] = [];

    for (const mappingFile of state.steps.mappingSearch.mappings) {
        for (const mapping of mappingFile.mappings) {
            const result: FormModell = {
                generalSettings: generalSettings,
                data: mapping,
                mappedInputProperties: await getMappedInputProperties(
                    mapping,
                    mappedSymbols
                ),
                mappedDetailsProperties: await getMappedDetailsProperties(
                    mapping,
                    mappedSymbols
                ),
                mappedInputMembers: await getMappedInputMembers(
                    mapping,
                    mappedSymbols
                ),
                mappedDetailsMembers: await getMappedDetailsMembers(
                    mapping,
                    mappedSymbols
                ),
            };
            results.push(result);
        }
    }

    dispatch(createFormModellsActionCreators.setFormModells(results));
    return results;
}
