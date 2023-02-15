import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { debugTypescriptNode } from "@src/common/utils/debugTypescriptNode";
import ts from "typescript";
import type { InFormMappingExpression } from "../../types/InFormMappingExpression";

export async function getInputTypeNode(
    node: InFormMappingExpression,
    doc: ts.SourceFile
): Promise<ts.TypeReferenceNode | null> {
    const log = getGeneratorLogger();

    const inputType = node.typeArguments?.at(0);
    if (inputType) {
        switch (inputType.kind) {
            case ts.SyntaxKind.TypeReference:
                if (ts.isTypeReferenceNode(inputType)) {
                    return inputType;
                }
            default:
                log.warn(
                    `Type ${ts.SyntaxKind[inputType.kind]}(${
                        inputType.kind
                    }) not supported for input types yet. (${inputType.getText(
                        doc
                    )})`
                );
                debugTypescriptNode(inputType, null);
                break;
        }
    } else {
        log.warn(
            `No input type has been found for InFormsMapping (Text ${node.getText(
                doc
            )})`
        );
    }
    return null;
}
