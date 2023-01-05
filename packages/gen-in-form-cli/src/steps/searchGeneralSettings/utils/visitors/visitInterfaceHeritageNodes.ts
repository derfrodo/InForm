import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { logTypescriptNode } from "@src/common/utils/logTypescriptNode";
import { getDocFromInFormSourceFile } from "@src/common/utils/typescript/getDocFromInFormSourceFile";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { InFormGeneralSettingsExpression } from "../../types/InFormGeneralSettingsExpression";
import { isInFormGeneralSettingsExpression } from "../isInFormGeneralSettingsExpression";

/**
 * returns an @see {@link InFormGeneralSettingsExpression} if node is inheriting InFormMapping interface otherwise null
 * @param node
 * @param doc
 * @returns
 */

export async function visitInterfaceHeritageNodes(
    node: ts.InterfaceDeclaration,
    sourceFile: InFormSourceFile
): Promise<InFormGeneralSettingsExpression | null> {
    const doc = getDocFromInFormSourceFile(sourceFile);
    const log = getGeneratorLogger();
    log.debug(`Visiting interface node ${node.name}`);

    for await (const child of node.heritageClauses ?? []) {
        for await (const type of child.types) {
            switch (type.kind) {
                case ts.SyntaxKind.ExpressionWithTypeArguments:
                    if (isInFormGeneralSettingsExpression(type, sourceFile)) {
                        return type;
                    } else if (ts.isExpressionWithTypeArguments(type)) {
                        log.debug(
                            `Node is ExpressionWithTypeArguments, but no actual InFormMapping (Text ${node.getText(
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
