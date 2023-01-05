import {
    InFormPropertyMatcherRegexPatternName,
    InFormPropertyMatcherRegexRegexName,
    InFormRuntimeModuleName,
} from "@src/common/constants";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { getNodeSymbol } from "@src/common/utils/getNodeSymbol";
import { isInFormInterfacesOfTypeDataExpression } from "@src/common/utils/resolveInterfacesOfType/helpers/isInFormInterfacesOfTypeDataExpression";
import { getNameForProperty } from "@src/common/utils/typescript/getNameForProperty";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";
import { getTypeArgumentAt } from "../../../common/utils/typescript/getTypeArgumentAt";
import { PropertyMappingMatcher } from "../types/PropertyMappingMatcher";

export function getPropertyMappingMatcher(
    matcherTypeNode: ts.TypeNode,
    file: InFormSourceFile
): PropertyMappingMatcher | null {
    if (!matcherTypeNode) {
        throw logAndError("No matcher has been passed");
    }

    if (
        isInFormInterfacesOfTypeDataExpression(matcherTypeNode, file, {
            baseInterfaceName: InFormPropertyMatcherRegexPatternName,
            moduleName: InFormRuntimeModuleName,
        })
    ) {
        throw logAndError("Not implemented yet");
    } else if (
        isInFormInterfacesOfTypeDataExpression(matcherTypeNode, file, {
            baseInterfaceName: InFormPropertyMatcherRegexRegexName,
            moduleName: InFormRuntimeModuleName,
        })
    ) {
        const arg = getTypeArgumentAt(matcherTypeNode, 0);
        const expr =
            ts.isTypeQueryNode(arg) && ts.isEntityName(arg.exprName)
                ? getNodeSymbol(arg.exprName as ts.EntityName)
                : null;
        const initializer =
            expr &&
            expr.valueDeclaration &&
            ts.isVariableDeclaration(expr.valueDeclaration) &&
            expr.valueDeclaration.initializer &&
            ts.isRegularExpressionLiteral(expr.valueDeclaration.initializer)
                ? (expr.valueDeclaration
                      .initializer as ts.RegularExpressionLiteral)
                : null;
        const text = initializer?.text;
        const matcher = /^(\/)(.*)(\/)([^\/]*)$/;
        const matches = text ? matcher.exec(text) : null;
        const regex =
            matches && matches.length === 5
                ? new RegExp(
                      matches[2],
                      matches[4].length > 0 ? matches[4] : undefined
                  )
                : null;

        if (!regex) {
            throw logAndError(
                "Failed to resolve RegExp (only /ab+c/ notation is allowed as of now)",
                {
                    regex,
                    initializer,
                    expr,
                }
            );
        }
        return {
            match: (property: ts.PropertySignature): boolean => {
                const name = getNameForProperty(property.name);
                const result = (name && regex.test(name)) || false;
                return result;
            },
            matcherTypeNode: matcherTypeNode,
        };
    } else {
        const msg = "No matching found for matcher";
        throw logAndError(msg, { matcher: matcherTypeNode });
    }
}
