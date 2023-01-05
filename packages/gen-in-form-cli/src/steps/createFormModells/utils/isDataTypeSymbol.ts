import { DeclarationForType } from "@src/common/types/DeclarationForType";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import {
    MappedSymbolForPropertyFromGeneralSetting as MappedSymbols,
    MappedSymbolInfo,
    MappedSymbolInfoTypes,
} from "../types/MappedSymbolForPropertyFromGeneralSetting";

function areEqualTypes(type1: ts.Type, type2: ts.Type): boolean {
    return type1.aliasSymbol === type2.aliasSymbol;
}

function areEqualDeclarations(
    dec1: DeclarationForType | null,
    dec2: DeclarationForType | null
): boolean {
    const log = getGeneratorLogger();
    const logdata = {
        dec1: dec1?.symbol?.getEscapedName(),
        dec2: dec2?.symbol?.getEscapedName(),
    };
    log.debug(`Check if same types are declared...`, logdata);

    if (dec1 !== null && dec2 === null) {
        return false;
    }
    if (dec1 === null && dec2 !== null) {
        return false;
    }
    if (!dec1 && !dec2) {
        return true;
    }
    if (!dec1 || !dec2) {
        return false;
    }

    const ta1 = dec1.typeArgumentDeclarations || [];
    const ta2 = dec2.typeArgumentDeclarations || [];

    if (ta1.length !== ta2.length) {
        return false;
    }
    if (ta1.length > 0) {
        return (
            ta1.filter((t1, index) => {
                const t2 = ta2[index];
                return !areEqualDeclarations(t1, t2);
            }).length === 0
        );
    }

    if (dec1.baseTypeNode && ts.isIndexedAccessTypeNode(dec1.baseTypeNode)) {
        if (
            dec2.baseTypeNode &&
            ts.isIndexedAccessTypeNode(dec2.baseTypeNode) &&
            dec2.declaration &&
            dec1.declaration
        ) {
            return (
                areEqualTypes(dec2.declaration, dec1.declaration) &&
                ts.isLiteralTypeNode(dec1.baseTypeNode.indexType) &&
                ts.isLiteralTypeNode(dec2.baseTypeNode.indexType) &&
                dec1.baseTypeNode.indexType.literal.getText() ===
                    dec2.baseTypeNode.indexType.literal.getText()
            );
        } else {
            return false;
        }
    }
    if (
        dec1.declaration &&
        dec2.declaration &&
        areEqualTypes(dec1.declaration, dec2.declaration)
    ) {
        return true;
    }

    return dec2.symbol === dec1.symbol;
}

export function isDataTypeSymbol(
    symbol: MappedSymbols,
    info: MappedSymbolInfo
): boolean {
    const { dataType } = symbol;
    let result = false;
    switch (dataType?.type) {
        case MappedSymbolInfoTypes.INDEXED:
            result =
                info.type === MappedSymbolInfoTypes.INDEXED &&
                dataType.index.symbol === info.index.symbol &&
                dataType.objectType.symbol === info.objectType.symbol;
            break;
        default:
            if (dataType?.declaration && info.declaration) {
                result = areEqualDeclarations(
                    dataType?.declaration,
                    info.declaration
                );
            } else {
                result = !!dataType && dataType.symbol === info.symbol;
            }
    }
    // const symbolMatches =
    // !!symbol.dataType && symbol.dataType.symbol === info.symbol;
    return result;
}
