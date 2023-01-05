import type { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import ts from "typescript";
import { GetInterfacesOfTypeOptions } from "../types/GetInterfacesOfTypeOptions";
import { getInFormsSourceImportInfoForInFormInterfacesOfTypeData } from "./getInFormsSourceImportInfoForInFormInterfacesOfTypeData";
import { InFormExpressionWithTypeArgumentsOfTypeDataExpression } from "../types/InFormExpressionWithTypeArgumentsOfTypeDataExpression";

/**
 * Identifies if a given typeNode (e.g. node.heritageClauses from ts.InterfaceDeclaration) is InFormMapping
 * @param typeNode
 * @returns
 */
export function isInFormExpressionWithTypeArgumentsOfTypeDataExpression<
    TInterface extends string
>(
    typeNode: ts.Node,
    context: InFormSourceFile,
    options: GetInterfacesOfTypeOptions<TInterface>
): typeNode is InFormExpressionWithTypeArgumentsOfTypeDataExpression<TInterface> {
    const isExpressionWithTypes =
        typeNode.kind === ts.SyntaxKind.ExpressionWithTypeArguments &&
        ts.isExpressionWithTypeArguments(typeNode);
    if (isExpressionWithTypes) {
        const expression = typeNode.expression;
        const expressionSource =
            getInFormsSourceImportInfoForInFormInterfacesOfTypeData(
                context,
                options
            );
        if (
            ts.isIdentifier(expression) &&
            expressionSource != null &&
            expression.text === options.baseInterfaceName
        ) {
            return true;
        }
    }

    return false;
}
