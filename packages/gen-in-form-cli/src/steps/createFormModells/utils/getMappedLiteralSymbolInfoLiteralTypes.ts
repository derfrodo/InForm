import ts from "typescript";
import { MappedLiteralSymbolInfoLiteralTypes } from "../types/MappedSymbolForPropertyFromGeneralSetting";

export function getMappedLiteralSymbolInfoLiteralTypes(
    node:
        | ts.LiteralTypeNode
        | ts.NullLiteral
        | ts.BooleanLiteral
        | ts.LiteralExpression
        | ts.PrefixUnaryExpression
): MappedLiteralSymbolInfoLiteralTypes {
    if (ts.isLiteralTypeNode(node)) {
        return getMappedLiteralSymbolInfoLiteralTypes(node.literal);
    }

    if (ts.isStringLiteral(node)) {
        return MappedLiteralSymbolInfoLiteralTypes.string;
    }
    if (ts.isNumericLiteral(node)) {
        return MappedLiteralSymbolInfoLiteralTypes.number;
    }
    if (
        node.kind === ts.SyntaxKind.FalseKeyword ||
        node.kind === ts.SyntaxKind.TrueKeyword
    ) {
        return MappedLiteralSymbolInfoLiteralTypes.boolean;
    }
    if (node.kind === ts.SyntaxKind.NullKeyword) {
        return MappedLiteralSymbolInfoLiteralTypes.null;
    }
    if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
        return MappedLiteralSymbolInfoLiteralTypes.undefined;
    }
    return MappedLiteralSymbolInfoLiteralTypes.unknown;
}
