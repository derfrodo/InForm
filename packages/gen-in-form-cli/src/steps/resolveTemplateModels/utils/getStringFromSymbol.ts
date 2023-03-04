import { logTypescriptNode } from "@src/common/utils/logTypescriptNode";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { MappedSymbolInfo } from "@src/steps/createFormModells/types/MappedSymbolForPropertyFromGeneralSetting";
import ts from "typescript";
import { getEscapedTextAsString } from "../../../common/utils/typescript/getEscapedTextAsString";

export function getStringFromSymbol(
    sym: MappedSymbolInfo | null
): string | null {
    if (null) {
        return null;
    }
    const symbol = sym?.symbol;
    const node = sym?.node;

    if (typeof symbol === "object") {
        try {
            return getEscapedTextAsString(symbol?.escapedName);
        } catch (e) {
            const log = getGeneratorLogger();
            if (
                symbol === null &&
                node &&
                ts.isTypeReferenceNode(node) &&
                ts.isIdentifier(node.typeName)
            ) {
                return getEscapedTextAsString(node.typeName.escapedText);
            }

            if (node) {
                logTypescriptNode(node, "Node with no escape text.");
                log.info("Additional information", {
                    symbol: sym?.symbol,
                    info: sym,
                });
            } else {
                log.info("No node for symbol", {
                    symbol: sym?.symbol,
                    info: sym,
                });
            }
            throw e;
        }
    }
    return symbol ?? null;
}
