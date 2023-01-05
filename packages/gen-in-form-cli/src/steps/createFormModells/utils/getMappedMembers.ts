import { getNameForProperty } from "@src/common/utils/typescript/getNameForProperty";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { MappedMember } from "../types/MappedMember";
import { MappedSymbolForPropertyFromGeneralSetting } from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { findMappedSymbolsForProperty } from "./findMappedSymbolsForProperty";

export async function getMappedMembers(
    signatures: ts.PropertySignature[],
    mappedSymbols: MappedSymbolForPropertyFromGeneralSetting[]
): Promise<MappedMember[]> {
    const log = getGeneratorLogger();
    const result: MappedMember[] = [];
    for (const inpt of signatures) {
        const { name } = inpt;

        const valueDeclaration = inpt;
        const propName = getNameForProperty(valueDeclaration.name);
        log.debug(`Resolve mapping for value of ${propName}.`);

        if (valueDeclaration.type) {
            const mappedType = await findMappedSymbolsForProperty(
                valueDeclaration,
                mappedSymbols
            );
            if (mappedType) {
                if (mappedType.length === 0) {
                    log.warn("No mapped types have been found for member", {
                        // type: valueDeclaration.type,
                        propName,
                        // mappedSymbols,
                    });
                }
                result.push({
                    mapped: mappedType,
                    signature: valueDeclaration,
                    name: propName,
                });
            } else {
                log.error(
                    `Failed to resolve mapping for value ${name}. Member type is undefined.`
                );
            }
        } else {
            log.error(
                `Failed to find mapping for value ${name}. Member type is undefined.`
            );
        }
    }
    return result;
}
