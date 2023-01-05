import ts from "typescript";

export function getSyntaxKindString(
    node: { kind: ts.SyntaxKind } | null | undefined
): string {
    return node ? ts.SyntaxKind[node.kind] : "undefined node";
}
