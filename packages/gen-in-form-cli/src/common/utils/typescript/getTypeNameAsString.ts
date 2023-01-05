import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { getEscapedTextAsString } from "./getEscapedTextAsString";
import { getTypeName } from "./getTypeName";

export function getTypeNameAsString(
    node?: ts.EntityName | ts.TypeReferenceNode | null
): null | string {
    const r = getTypeName(node);
    if (r !== null) {
        return getEscapedTextAsString(r);
    }
    const log = getGeneratorLogger();
    const msg = `No typename found for node ${node?.getText()}.`;

    log.warn(msg);
    return null;
}
