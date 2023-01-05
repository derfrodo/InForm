import {
    InFormDefaultValuesPropertyName,
    InFormDefaultValuesTypeName,
    InFormRuntimeModuleName,
} from "@src/common/constants";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";
import { InFormMappingExpression } from "../../types/InFormMappingExpression";
import { getGenericMemberValueTypeFromInFormMapping } from "./getGenericMemberValueTypeFromInFormMapping";

export type InFormMappingDefaultValueType =
    | (ts.TypeNode & (ts.TypeReferenceNode | ts.TypeLiteralNode))
    | null;

function isTypeReferenceNodeOrTypeLiteralNode(
    node: ts.TypeNode
): node is ts.TypeReferenceNode | ts.TypeLiteralNode {
    return ts.isTypeReferenceNode(node) || ts.isTypeLiteralNode(node);
}

export async function getDefaultValuesTypeFromInFormMapping(
    node: InFormMappingExpression
): Promise<InFormMappingDefaultValueType> {
    const log = getGeneratorLogger();
    try {
        log.info("Resolving default values from InFormMappingExpression", {
            name: node.typeName,
        });
        const n = await getGenericMemberValueTypeFromInFormMapping(
            node,
            InFormDefaultValuesPropertyName,
            {
                baseInterfaceName: InFormDefaultValuesTypeName,
                moduleName: InFormRuntimeModuleName,
            },
            isTypeReferenceNodeOrTypeLiteralNode
        );
        return n;
    } catch (err) {
        throw logAndError("Failed to resolve default values type", err);
    }
}
