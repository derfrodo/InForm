import { InFormRuntimeModuleName } from "@src/common/constants";
import type { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { isInFormExpressionWithTypeArgumentsOfTypeDataExpression } from "@src/common/utils/resolveInterfacesOfType/helpers/isInFormExpressionWithTypeArgumentsOfTypeDataExpression";
import ts from "typescript";
import { InFormMappingInterfaceName } from "../constants";
import type { InFormMappingExpression } from "../types/InFormMappingExpression";

/**
 * Identifies if a given typeNode (e.g. node.heritageClauses from ts.InterfaceDeclaration) is InFormMapping
 * @param typeNode
 * @returns
 */
export function isInFormMappingExpression(
    typeNode: ts.Node,
    context: InFormSourceFile
): typeNode is InFormMappingExpression {
    return isInFormExpressionWithTypeArgumentsOfTypeDataExpression(
        typeNode,
        context,
        {
            baseInterfaceName: InFormMappingInterfaceName,
            moduleName: InFormRuntimeModuleName,
        }
    );
    // const isExpressionWithTypes =
    //     typeNode.kind === ts.SyntaxKind.ExpressionWithTypeArguments &&
    //     ts.isExpressionWithTypeArguments(typeNode);
    // if (isExpressionWithTypes) {
    //     const expression = typeNode.expression;
    //     const expressionSource =
    //         getInFormsSourceImportInfoForMappingInterface(context);
    //     if (
    //         ts.isIdentifier(expression) &&
    //         expressionSource != null &&
    //         expression.text === InFormMappingInterfaceName
    //     ) {
    //         return true;
    //     }
    // }

    // return false;
}
