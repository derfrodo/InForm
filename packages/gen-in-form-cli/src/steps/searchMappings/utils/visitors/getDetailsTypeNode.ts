import { getSingleIndexedAccessTypeIntersectionType } from "@src/common/utils/getSingleIndexedAccessTypeIntersectionType";
import { debugTypescriptNode } from "@src/common/utils/logTypescriptNode";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";
import type { InFormMappingExpression } from "../../types/InFormMappingExpression";
import { getSyntaxKindString } from "./getSyntaxKindString";
import { resolveTypeForIndexedAccessType } from "./resolveTypeForIndexedAccessType";

export type DetailsTypeNode = {
    type: ts.TypeReferenceNode | ts.TypeLiteralNode;
    outerType?: ts.IndexedAccessTypeNode;
    nullable: boolean;
    optional: boolean;
};
export type DetailsIndexedTypeNode = DetailsTypeNode & {
    type: ts.TypeLiteralNode;
    outerType: ts.IndexedAccessTypeNode;
    nullable: boolean;
    optional: boolean;
};
export function isDetailsIndexedTypeNode(
    node: DetailsTypeNode | null
): node is DetailsIndexedTypeNode {
    return !!node && typeof node === "object" && !!node.outerType;
}

export async function getDetailsTypeNode(
    node: InFormMappingExpression,
    doc: ts.SourceFile
): Promise<DetailsTypeNode | null> {
    const log = getGeneratorLogger();
    const detailsType = node.typeArguments?.at(1);
    if (detailsType) {
        switch (detailsType.kind) {
            case ts.SyntaxKind.TypeReference:
                if (ts.isTypeReferenceNode(detailsType)) {
                    return {
                        type: detailsType,
                        nullable: false,
                        optional: false,
                    };
                }
            case ts.SyntaxKind.IntersectionType:
                if (ts.isIntersectionTypeNode(detailsType)) {
                    const t = getSingleIndexedAccessTypeIntersectionType(
                        detailsType,
                        (node) => {
                            return ts.isTypeLiteralNode(node);
                        }
                    );
                    const type = resolveTypeForIndexedAccessType(t);
                    const { type: innerType, ...rest } = type;
                    if (
                        ts.isTypeReferenceNode(innerType) ||
                        ts.isTypeLiteralNode(innerType)
                    ) {
                        return { ...rest, type: innerType, outerType: t };
                    } else {
                        debugTypescriptNode(detailsType, null);
                        const msg = `Indexed types have to point to reference types or typeliterals. (${detailsType.getText(
                            doc
                        )})`;
                        throw logAndError(msg);
                    }
                }
            default:
                const msg = `Type ${getSyntaxKindString(detailsType)}(${
                    detailsType.kind
                }) not supported for details types yet. (${detailsType.getText(
                    doc
                )})`;
                log.error(msg);
                debugTypescriptNode(detailsType, null);
                throw new Error(msg);
                break;
        }
    } else {
        log.warn(
            `No details type has been found for InFormsMapping (Text ${node.getText(
                doc
            )})`
        );
    }
    return null;
}
