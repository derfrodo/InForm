import { getDeclarationForType } from "@src/common/utils/getDeclarationForType";
import { getNodeSymbol } from "@src/common/utils/getNodeSymbol";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import { getSingleNonNullUniontypeInfo } from "@src/common/utils/getSingleNonNullUniontypeInfo";
import ts from "typescript";
import {
    MappedLiteralSymbolInfoLiteralTypes,
    MappedSymbolInfo,
    MappedSymbolInfoTypes,
} from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { getMappedLiteralSymbolInfoLiteralTypes } from "./getMappedLiteralSymbolInfoLiteralTypes";
import { logTypescriptNode } from "@src/common/utils/logTypescriptNode";

export function getMappedSymbolInfo(
    node: ts.TypeNode | null
): MappedSymbolInfo | null {
    if (!node) {
        return null;
    }
    let result: MappedSymbolInfo = {
        node,
        symbol: null,
        type: MappedSymbolInfoTypes.UNKNOWN,
    };

    const log = getGeneratorLogger();
    if (ts.isTypeReferenceNode(node)) {
        const txt = node.getText();
        log.debug(`MappedSymbolInfo - Reference: ${txt}`);
        const declaration = getDeclarationForType(node);
        const symbol = declaration?.declaration?.symbol ?? getNodeSymbol(node);
        result = {
            node,
            declaration,
            symbol: symbol,
            type: MappedSymbolInfoTypes.REFERENCETYPE,
        };
    } else if (ts.isToken(node)) {
        const txt = node.getText();
        log.debug(`MappedSymbolInfo - Token: ${txt}`);
        result = {
            node,
            symbol: txt,
            type: MappedSymbolInfoTypes.TOKEN,
        };
    } else if (ts.isIndexedAccessTypeNode(node)) {
        const txt = node.getText();
        const objectTypeMapping = getMappedSymbolInfo(node.objectType);
        const indexTypeMapping = getMappedSymbolInfo(node.indexType);
        // const txt = `${node.objectType.getText()}[${node.indexType.getText()}]`;
        if (!objectTypeMapping || !indexTypeMapping) {
            throw logAndError(`Failed to resolve indexed infos for ${txt}`, {
                txt,
                objectTypeMapping,
                indexTypeMapping,
            });
        }

        log.debug(`Found IndexedAccessTypeNode - Token: ${txt}`);
        result = {
            node,
            objectNode: node.objectType,
            indexNode: node.indexType,

            symbol: txt,
            index: indexTypeMapping,
            objectType: objectTypeMapping,
            type: MappedSymbolInfoTypes.INDEXED,
        };
    } else if (ts.isLiteralTypeNode(node)) {
        const txt = ts.isStringLiteral(node.literal)
            ? node.literal.text
            : node.getText();
        log.debug(`Literal - Token: ${txt}`);
        const literalType: MappedLiteralSymbolInfoLiteralTypes =
            getMappedLiteralSymbolInfoLiteralTypes(node);
        result = {
            node,
            symbol: txt,
            type: MappedSymbolInfoTypes.LITERAL,
            literalType,
        };
    } else if (ts.isUnionTypeNode(node)) {
        const typeinfo = getSingleNonNullUniontypeInfo(node);
        const txt =
            ts.isLiteralTypeNode(typeinfo.type) &&
            ts.isStringLiteral(typeinfo.type.literal)
                ? typeinfo.type.literal.text
                : node.getText();

        log.debug(`Uniontype - Token: ${txt}`);
        result = {
            node,
            symbol:
                typeinfo.nullable &&
                ts.isLiteralTypeNode(typeinfo.type) &&
                ts.isStringLiteral(typeinfo.type.literal)
                    ? `${txt} | null`
                    : txt,
            type: MappedSymbolInfoTypes.LITERAL,
            literalType: MappedLiteralSymbolInfoLiteralTypes.unknown,
        };
    } else if (ts.isTypeLiteralNode(node)) {
        const txt = node.getText();

        log.debug(`Type Literal: ${txt}`);
        result = {
            type: MappedSymbolInfoTypes.LITERALTYPE,
            node,
            symbol: txt,
        };
    } else if (ts.isArrayTypeNode(node)) {
        const txt = node.getText();
        log.debug(`Array type found for: ${txt}`);
        const info = getMappedSymbolInfo(node.elementType);
        if (info) {
            result = {
                ...info,
                isArray: true,
            };
        } else {
            logTypescriptNode(
                node,
                "Evaluate symbol info failed for array-node"
            );
            throw logAndError(
                `Failed to evaluate mapped symbol info for array node "${txt}".`
            );
        }
    } else {
        const txt = node.getText();
        logTypescriptNode(node, "Evaluate symbol info failed for node");
        throw logAndError(
            `Failed to evaluate mapped symbol info for "${txt}".`
        );
    }
    return result;
}
