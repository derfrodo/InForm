import {
    getInFormSourceFileFromNode,
    isInFormInterfacesOfTypeDataExpression,
} from "@src/common/utils/resolveInterfacesOfType/helpers/isInFormInterfacesOfTypeDataExpression";
import { GetInterfacesOfTypeOptions } from "@src/common/utils/resolveInterfacesOfType/types/GetInterfacesOfTypeOptions";
import { findMemberFromInterface } from "@src/common/utils/typescript/findMemberFromInterface";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { InFormMappingExpression } from "../../types/InFormMappingExpression";
import { InFormMemberValueType } from "../../types/InFormMemberValueType";
import { getIndexedAccessNodeTypeInfo } from "./getIndexedAccessNodeTypeInfo";

function isIntersectionOrAccessTypeNode(
    node: ts.TypeNode
): node is ts.IntersectionTypeNode | ts.IndexedAccessTypeNode {
    return ts.isIntersectionTypeNode(node) || ts.isIndexedAccessTypeNode(node);
}

/**
 * Searches in member of given Node types of specified Member according to typeguard
 * @param node
 * @param genericOuterTypeInfo this is the actual type of the member (you will be interested in firts typeargument of this generic type though)
 * @returns
 */
export async function getGenericMemberValueTypeFromInFormMapping<
    TGenericTypeName extends string,
    GuardedTypes extends ts.TypeNode
>(
    node: InFormMappingExpression,
    memberName: string,
    genericOuterTypeInfo: GetInterfacesOfTypeOptions<TGenericTypeName>,
    typeGuardCallback: (obj: ts.TypeNode) => obj is GuardedTypes
): Promise<InFormMemberValueType<GuardedTypes>> {
    const log = getGeneratorLogger();

    const interfaceNode = node.parent ? node.parent.parent : null;

    if (interfaceNode && ts.isInterfaceDeclaration(interfaceNode)) {
        const memberWithMachtingName = findMemberFromInterface(
            interfaceNode,
            memberName
        );
        const sf = await getInFormSourceFileFromNode(node);
        const type = memberWithMachtingName?.type;
        if (
            type &&
            isInFormInterfacesOfTypeDataExpression(
                type,
                sf,
                genericOuterTypeInfo
            )
        ) {
            const firstTypeArgument = type.typeArguments?.at(0);
            if (
                firstTypeArgument &&
                isIntersectionOrAccessTypeNode(firstTypeArgument)
            ) {
                return (
                    getIndexedAccessNodeTypeInfo(
                        firstTypeArgument,
                        typeGuardCallback
                    )?.type ?? null
                );
            } else if (
                firstTypeArgument &&
                typeGuardCallback(firstTypeArgument)
            ) {
                return firstTypeArgument;
            } else {
                log.warn(
                    "membertype found for mapping, but not as indexed access type intersected with {}",
                    { resolvedType: memberWithMachtingName.getText() }
                );
                return null;
            }
        } else {
            log.warn("generic Value Type type might be empty?", {
                resolvedType: memberWithMachtingName?.getText(),
            });
            return null;
        }
    } else {
        log.warn(
            "Failed to evaluate mappings, it must be an interface as of now unfortunatelly to use the membertype"
        );
        return null;
    }
}
