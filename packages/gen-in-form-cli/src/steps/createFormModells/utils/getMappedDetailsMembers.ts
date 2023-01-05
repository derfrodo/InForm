import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { MappedSymbolForPropertyFromGeneralSetting } from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { MappedMember } from "../types/MappedMember";
import { FormMappingData } from "../../searchMappings/types/FormMappingData";
import { getMappedMembers } from "./getMappedMembers";

export async function getMappedDetailsMembers(
    mapping: FormMappingData,
    mappedSymbols: MappedSymbolForPropertyFromGeneralSetting[]
): Promise<MappedMember[]> {
    const log = getGeneratorLogger();
    log.debug(
        `Resolve mapped details members for ${mapping.mapNode.name.escapedText}.`
    );
    const members = mapping.detailsTypeDetails?.members;
    const result: MappedMember[] | null = members
        ? await getMappedMembers(members, mappedSymbols)
        : null;
    return result ?? [];
}
