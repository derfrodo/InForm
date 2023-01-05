import { getNameForEntityName } from "@src/common/utils/typescript/getNameForEntityName";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";

export function getTypeName(type: ts.TypeNode): string {
    // TODO CHECK FOR IMPORT
    let result: string | null | undefined = undefined;
    if (ts.isTypeReferenceNode(type)) {
        result = getNameForEntityName(type.typeName);
    }

    if (ts.isTypeQueryNode(type)) {
        result = getNameForEntityName(type.exprName);
    }

    if (result === undefined) {
        throw logAndError(
            "Expect type to be either type query node or type reference node"
        );
    }
    if (result === null) {
        throw logAndError(
            "No name of type has been resolved from assumed valid type node",
            { type: type.getText(), kind: ts.SyntaxKind[type.kind] }
        );
    }
    return result;
}
