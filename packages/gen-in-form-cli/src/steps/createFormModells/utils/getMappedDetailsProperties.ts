import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { FormMappingData } from "../../searchMappings/types/FormMappingData";
import { MappedProperty } from "../types/MappedProperty";
import { MappedSymbolForPropertyFromGeneralSetting } from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { getMappedProperties } from "./getMappedProperties";

export async function getMappedDetailsProperties(
    mapping: FormMappingData,
    mappedSymbols: MappedSymbolForPropertyFromGeneralSetting[]
): Promise<MappedProperty[]> {
    const log = getGeneratorLogger();
    log.debug(
        `Resolve mapped details properties for ${mapping.mapNode.name.escapedText}.`
    );
    const inpts = mapping.detailsTypeDetails?.properties || [];
    const result: MappedProperty[] = await getMappedProperties(
        inpts,
        mappedSymbols
    );
    return result;
}
