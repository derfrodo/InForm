import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { MappedSymbolForPropertyFromGeneralSetting as MappedSymbolForPropertyFromGeneralSetting } from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { MappedProperty } from "../types/MappedProperty";
import { FormMappingData } from "../../searchMappings/types/FormMappingData";
import { getMappedProperties } from "./getMappedProperties";

export async function getMappedInputProperties(
    mapping: FormMappingData,
    mappedSymbolForPropertiesFromGeneralSettings: MappedSymbolForPropertyFromGeneralSetting[]
): Promise<MappedProperty[]> {
    const log = getGeneratorLogger();
    log.debug(
        `Resolve mapped input properties for ${mapping.mapNode.name.escapedText}.`
    );
    const inpts = mapping.inputTypeDetails?.properties || [];
    const result: MappedProperty[] = await getMappedProperties(
        inpts,
        mappedSymbolForPropertiesFromGeneralSettings
    );

    return result;
}
