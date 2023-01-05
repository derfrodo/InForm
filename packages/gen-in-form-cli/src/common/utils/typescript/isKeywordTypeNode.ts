import ts, { SyntaxKind } from "typescript";

export function isKeywordTypeNode(
    type: ts.TypeNode
): type is ts.TypeNode & { kind: ts.KeywordTypeSyntaxKind } {
    switch (type.kind) {
        case SyntaxKind.AnyKeyword:
        case SyntaxKind.BigIntKeyword:
        case SyntaxKind.BooleanKeyword:
        case SyntaxKind.IntrinsicKeyword:
        case SyntaxKind.NeverKeyword:
        case SyntaxKind.NumberKeyword:
        case SyntaxKind.ObjectKeyword:
        case SyntaxKind.StringKeyword:
        case SyntaxKind.SymbolKeyword:
        case SyntaxKind.UndefinedKeyword:
        case SyntaxKind.UnknownKeyword:
        case SyntaxKind.VoidKeyword:
            return true;
        default:
            return false;
    }
}
