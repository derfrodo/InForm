import ts from "typescript";

export function getTypeName(
    node?: ts.EntityName | ts.TypeReferenceNode | null
): null | ts.__String {
    if (!node) {
        return null;
    }

    if (ts.isTypeReferenceNode(node)) {
        return getTypeName(node.typeName);
    }
    if (ts.isIdentifier(node)) {
        return node.escapedText;
    } else {
        return `${getTypeName(node.left)}.${
            node.right.escapedText
        }` as ts.__String;
    }
}
