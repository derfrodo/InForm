import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { FormMappingData } from "@src/steps/searchMappings/types/FormMappingData";
import { MappedMember } from "../types/MappedMember";
import { MappedSymbolForPropertyFromGeneralSetting } from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { getMappedMembers } from "./getMappedMembers";

export async function getMappedInputMembers(
    mapping: FormMappingData,
    mappedSymbols: MappedSymbolForPropertyFromGeneralSetting[]
): Promise<MappedMember[]> {
    const log = getGeneratorLogger();
    log.debug(
        `Resolve mapped intput members for ${mapping.mapNode.name.escapedText}.`
    );
    const members = mapping.inputTypeDetails?.members;
    const result: MappedMember[] | null = members
        ? await getMappedMembers(members, mappedSymbols)
        : null;
    return result ?? [];
}
