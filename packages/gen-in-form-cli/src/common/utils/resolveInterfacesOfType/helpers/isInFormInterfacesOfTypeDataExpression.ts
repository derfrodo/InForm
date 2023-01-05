import type { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import ts from "typescript";
import { GetInterfacesOfTypeOptions } from "../types/GetInterfacesOfTypeOptions";
import { getInFormsSourceImportInfoForInFormInterfacesOfTypeData } from "./getInFormsSourceImportInfoForInFormInterfacesOfTypeData";
import { InFormInterfacesOfTypeDataExpression } from "../types/InFormInterfacesOfTypeDataExpression";

// These lines are needed for jsDoc below ;)
import { getOrCreateInFormsSourceFile as getOrCreateInFormsSourceFileI } from "../../getOrCreateInFormsSourceFile";
export const getOrCreateInFormsSourceFile = getOrCreateInFormsSourceFileI;

export async function getInFormSourceFileFromNode(
    typeNode: ts.Node
): Promise<InFormSourceFile> {
    const file = await getOrCreateInFormsSourceFile(
        typeNode.getSourceFile().fileName
    );
    return file;
}

/**
 * Identifies if a given typeNode (e.g. node.heritageClauses from ts.InterfaceDeclaration) is InFormMapping
 * @param typeNode
 * @param context you have only a @see {@link ts.SourceFile} available? Then use the method @see {@link getOrCreateInFormsSourceFile}
 * @returns
 */
export function isInFormInterfacesOfTypeDataExpression<
    TInterface extends string
>(
    typeNode: ts.Node,
    context: InFormSourceFile,
    options: GetInterfacesOfTypeOptions<TInterface>
): typeNode is InFormInterfacesOfTypeDataExpression<TInterface> {
    const isExpressionWithTypes =
        typeNode.kind === ts.SyntaxKind.TypeReference &&
        ts.isTypeReferenceNode(typeNode);
    if (isExpressionWithTypes) {
        const expressionSource =
            getInFormsSourceImportInfoForInFormInterfacesOfTypeData(
                context,
                options
            );

        const typeName = typeNode.typeName;
        if (
            expressionSource != null &&
            ts.isIdentifier(typeName) &&
            typeName.escapedText === options.baseInterfaceName
        ) {
            return true;
        }
    }

    return false;
}
