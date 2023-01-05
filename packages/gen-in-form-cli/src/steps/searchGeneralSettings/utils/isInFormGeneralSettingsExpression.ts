import type { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import ts from "typescript";
import type { InFormGeneralSettingsExpression } from "../types/InFormGeneralSettingsExpression";
import { InFormGeneralSettingsInterfaceName } from "../constants";
import { getInFormsSourceImportInfoForGeneralSettingsInterface } from "./getInFormsSourceImportInfoForGeneralSettingsInterface";

/**
 * Identifies if a given typeNode (e.g. node.heritageClauses from ts.InterfaceDeclaration) is InFormMapping
 * @param typeNode
 * @returns
 */
export function isInFormGeneralSettingsExpression(
    typeNode: ts.Node,
    context: InFormSourceFile
): typeNode is InFormGeneralSettingsExpression {
    const isExpressionWithTypes =
        typeNode.kind === ts.SyntaxKind.ExpressionWithTypeArguments &&
        ts.isExpressionWithTypeArguments(typeNode);
    if (isExpressionWithTypes) {
        const expression = typeNode.expression;
        const expressionSource =
            getInFormsSourceImportInfoForGeneralSettingsInterface(context);
        if (
            ts.isIdentifier(expression) &&
            expressionSource != null &&
            expression.text === InFormGeneralSettingsInterfaceName
        ) {
            return true;
        }
    }

    return false;
}
