import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { logTypescriptNode } from "@src/common/utils/logTypescriptNode";
import { getDocFromInFormSourceFile } from "@src/common/utils/typescript/getDocFromInFormSourceFile";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { isInFormExpressionWithTypeArgumentsOfTypeDataExpression } from "../helpers/isInFormExpressionWithTypeArgumentsOfTypeDataExpression";
import { GetInterfacesOfTypeOptions } from "../types/GetInterfacesOfTypeOptions";
import { InFormExpressionWithTypeArgumentsOfTypeDataExpression } from "../types/InFormExpressionWithTypeArgumentsOfTypeDataExpression";

/**
 * returns an @see {@link InFormExpressionWithTypeArgumentsOfTypeDataExpression<TInterface>} if node is inheriting interface according to options otherwise null
 * @param node
 * @param doc
 * @returns
 */

export async function visitInterfaceHeritageNodes<TInterface extends string>(
    node: ts.InterfaceDeclaration,
    sourceFile: InFormSourceFile,
    options: GetInterfacesOfTypeOptions<TInterface>
): Promise<InFormExpressionWithTypeArgumentsOfTypeDataExpression<TInterface> | null> {
    const doc = getDocFromInFormSourceFile(sourceFile);
    const log = getGeneratorLogger();
    log.debug(`Visiting interface node ${node.name}`);

    for await (const child of node.heritageClauses ?? []) {
        for await (const type of child.types) {
            switch (type.kind) {
                case ts.SyntaxKind.ExpressionWithTypeArguments:
                    if (
                        isInFormExpressionWithTypeArgumentsOfTypeDataExpression(
                            type,
                            sourceFile,
                            options
                        )
                    ) {
                        return type;
                    } else if (ts.isExpressionWithTypeArguments(type)) {
                        log.debug(
                            `Node is ExpressionWithTypeArguments, but no actual InFormInterfacesOfTypeDataExpression (Text ${node.getText(
                                doc
                            )})`
                        );
                    } else {
                        // This actually should never happen, right?
                        log.warn(
                            `Node is expected to be ExpressionWithTypeArguments, but casting failed (Text ${node.getText(
                                doc
                            )})`
                        );
                        logTypescriptNode(type, null);
                    }
                    break;
                default:
                    logTypescriptNode(type, null);
                    break;
            }
        }
    }
    return null;
}
