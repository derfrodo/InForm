import ts from "typescript";
import {
    MappedSymbolForPropertyFromGeneralSetting as MappedSymbols,
    MappedSymbolInfo,
} from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { isDataTypeSymbol as isDataTypeSymbol } from "./isDataTypeSymbol";
import { getMappedSymbolInfo } from "./getMappedSymbolInfo";
import { logAndError } from "@src/logging/logAndThrow";
import { getNameForProperty } from "@src/common/utils/typescript/getNameForProperty";

export function findMappedSymbolsForProperty(
    propertySignature: ts.PropertySignature | ts.PropertyDeclaration | null,
    symbols: MappedSymbols[]
): MappedSymbols[] {
    const name =
        propertySignature && getNameForProperty(propertySignature.name);
    const typeNode = propertySignature?.type;
    if (!propertySignature || !typeNode) {
        throw logAndError("No typenode or value declaraion", {
            valueDeclaration: propertySignature,
            name,
        });
    }
    const info: MappedSymbolInfo | null = getMappedSymbolInfo(typeNode);

    const matches =
        info !== null
            ? symbols.filter((s) => {
                const result =
                    s.matcherForProperty === null
                        ? isDataTypeSymbol(s, info)
                        : s.matcherForProperty.match(propertySignature);
                return result;
            })
            : [];

    return matches ?? null;
}
