import { findMemberFromInterface } from "@src/common/utils/typescript/findMemberFromInterface";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";
import { InFormMappingExpression } from "../../types/InFormMappingExpression";

/**
 * Searches in member of given Node types of specified Member according to typeguard
 * @param node
 * @returns
 */

export async function getMemberValueTypeFromInFormMapping<
    GuardedTypes extends ts.TypeNode
>(
    node: InFormMappingExpression,
    memberName: string,
    typeGuardCallback: (obj: ts.TypeNode) => obj is GuardedTypes
): Promise<GuardedTypes | null> {
    const log = getGeneratorLogger();

    const interfaceNode = node.parent ? node.parent.parent : null;

    if (interfaceNode && ts.isInterfaceDeclaration(interfaceNode)) {
        const memberWithMachtingName = findMemberFromInterface(
            interfaceNode,
            memberName
        );
        const type = memberWithMachtingName?.type;
        if (memberWithMachtingName === null) {
            return null;
        } else if (type && typeGuardCallback(type)) {
            return type;
        } else {
            throw logAndError("Member not matching expected type.", {
                resolvedType: memberWithMachtingName?.getText(),
            });
        }
    } else {
        log.warn(
            "Failed to evaluate mappings, it must be an interface as of now unfortunatelly to use the membertype"
        );
        return null;
    }
}
