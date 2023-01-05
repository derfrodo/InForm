import { getSingleIndexedAccessTypeIntersectionType } from "@src/common/utils/getSingleIndexedAccessTypeIntersectionType";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";
import { resolveTypeForIndexedAccessType } from "./resolveTypeForIndexedAccessType";
import { FormMappingIndexedAccessNodeTypeInfo } from "../../types/FormMappingIndexedAccessNodeTypeInfo";
import { TypescriptTypeNodeSpecializationTypeguard } from "./TypescriptTypeNodeSpecializationTypeguard";

export { getIndexedAccessNodeInfo } from "./getIndexedAccessNodeInfo";

/**
 * more specifc function? @see {@link getIndexedAccessNodeInfo}
 * @param node
 * @param typeGuardCallback
 * @returns
 */
export function getIndexedAccessNodeTypeInfo<TInnerType extends ts.TypeNode>(
    node: ts.Node,
    typeGuardCallback: TypescriptTypeNodeSpecializationTypeguard<TInnerType>
): FormMappingIndexedAccessNodeTypeInfo<TInnerType> | null {
    const log = getGeneratorLogger();
    const indexedAccess =
        node && ts.isIntersectionTypeNode(node)
            ? getSingleIndexedAccessTypeIntersectionType(node)
            : ts.isIndexedAccessTypeNode(node)
            ? node
            : null;

    if (indexedAccess) {
        const inner = resolveTypeForIndexedAccessType(indexedAccess);
        const { type: innerType, ...rest } = inner;
        if (typeGuardCallback(innerType)) {
            log.debug("resolved indexed type", {
                node: node.getText(),
            });
            return {
                ...rest,
                type: innerType,
                outerType: indexedAccess,
            };
        } else {
            const msg = `Indexed type does not match expected types. (${node.getText()})`;
            throw logAndError(msg);
        }
    } else {
        throw logAndError(
            "Failed to map given node as indexed access node info",
            {
                node: node.getText(),
            }
        );
    }
}
