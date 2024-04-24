import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { MappedSymbolForPropertyFromGeneralSetting } from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { MappedProperty } from "../types/MappedProperty";
import { findMappedSymbolsForProperty } from "./findMappedSymbolsForProperty";
import { getNameForProperty } from "@src/common/utils/typescript/getNameForProperty";

export async function getMappedProperties(
    symbols: ts.Symbol[],
    mappedSymbols: MappedSymbolForPropertyFromGeneralSetting[]
): Promise<MappedProperty[]> {
    const log = getGeneratorLogger();
    const result: MappedProperty[] = [];
    for (const inpt of symbols) {
        const { escapedName } = inpt;
        let valueDeclaration = inpt.valueDeclaration;

        if (
            inpt.getFlags() ===
            (ts.SymbolFlags.Transient | ts.SymbolFlags.Property)
        ) {
            log.debug(
                `Property "${escapedName}" has transient property symbol (might be a Pick<> or something).`
            );
            const valueDeclarations = inpt.declarations?.filter((d) =>
                ts.isPropertySignature(d)
            );

            if (
                valueDeclarations === undefined ||
                (valueDeclarations.length ?? 0) !== 1
            ) {
                log.warn(
                    `Property "${escapedName}" has no unique property signature in its symbol.`
                );
            } else {
                valueDeclaration = valueDeclarations[0];
            }
        }

        if (valueDeclaration && ts.isPropertySignature(valueDeclaration)) {
            const propName = getNameForProperty(valueDeclaration.name);
            log.debug(`Resolve mapping for value of ${propName}.`);

            if (valueDeclaration.type) {
                const mappedInFormDataType = await findMappedSymbolsForProperty(
                    valueDeclaration,
                    mappedSymbols
                );
                if (mappedInFormDataType) {
                    if (mappedInFormDataType.length === 0) {
                        log.warn(
                            "No mapped types have been found for property",
                            {
                                type: valueDeclaration.type,
                                propName,
                                mappedSymbols,
                            }
                        );
                    }
                    result.push({
                        mapped: mappedInFormDataType,
                        signature: valueDeclaration,
                        name: propName,
                        propertySymbol: inpt,
                    });
                } else {
                    log.error(
                        `Failed to resolve mapping for value ${escapedName}. Property type is undefined.`
                    );
                }
            } else {
                log.error(
                    `Failed to find mapping for value ${inpt.escapedName}. Property type is undefined.`
                );
            }
        } else if (valueDeclaration && ts.isPropertyDeclaration(valueDeclaration)) {
            const propName = getNameForProperty(valueDeclaration.name);
            log.debug(`Resolve mapping for value of ${propName}.`);


            if (valueDeclaration.type) {
                const mappedInFormDataType = await findMappedSymbolsForProperty(
                    valueDeclaration,
                    mappedSymbols
                );
                if (mappedInFormDataType) {
                    if (mappedInFormDataType.length === 0) {
                        log.warn(
                            "No mapped types have been found for property",
                            {
                                type: valueDeclaration.type,
                                propName,
                                mappedSymbols,
                            }
                        );
                    }
                    result.push({
                        mapped: mappedInFormDataType,
                        signature: valueDeclaration,
                        name: propName,
                        propertySymbol: inpt,
                    });
                } else {
                    log.error(
                        `Failed to resolve mapping for value ${escapedName}. Property type is undefined.`
                    );
                }
            } else {
                log.error(
                    `Failed to find mapping for value ${inpt.escapedName}. Property type is undefined.`
                );
            }

        } else {
            log.error(
                `Failed to find mapping for value ${inpt.escapedName
                }. Property access expression expected, but got ${(valueDeclaration as any).body} ${valueDeclaration?.kind ?? "undefined"
                }`
            );
        }
    }
    return result;
}
