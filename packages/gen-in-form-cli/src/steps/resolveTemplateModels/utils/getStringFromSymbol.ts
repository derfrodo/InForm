import { MappedSymbolInfo } from "@src/steps/createFormModells/types/MappedSymbolForPropertyFromGeneralSetting";
import { getEscapedTextAsString } from "../../../common/utils/typescript/getEscapedTextAsString";

export function getStringFromSymbol(
    sym: MappedSymbolInfo | null
): string | null {
    if (null) {
        return null;
    }
    const symbol = sym?.symbol;

    if (typeof symbol === "object") {
        return getEscapedTextAsString(symbol?.escapedName);
    }
    return symbol ?? null;
}
