import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";

export function getTypeArgumentAt(
    referenceNode: ts.Node,
    index: number
): ts.TypeNode {
    const result =
        index >= 0 &&
        ts.isTypeReferenceNode(referenceNode) &&
        (referenceNode.typeArguments?.length ?? 0) > index
            ? referenceNode.typeArguments?.at(index)
            : null;
    if (!result) {
        throw logAndError(
            `No type agument found for node ${referenceNode.getText()} at ${index}. Please note: Only 'TypeReferenceNode' are supported yet.`,
            { index, referenceNode }
        );
    }

    return result;
}
