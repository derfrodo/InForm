import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";
import { FormMappingIndexedAccessTypeInfo } from "../../types/FormMappingIndexedAccessTypeInfo";
import { getIndexedAccessNodeTypeInfo } from "./getIndexedAccessNodeTypeInfo";

function isTypeReferenceNodeOrTypeLiteralNode(
    obj: ts.TypeNode
): obj is ts.TypeReferenceNode | ts.TypeLiteralNode {
    return ts.isTypeReferenceNode(obj) || ts.isTypeLiteralNode(obj);
}

export function getIndexedAccessNodeInfo(
    nodeIntersectionTypeNode: ts.IntersectionTypeNode | ts.Node
): FormMappingIndexedAccessTypeInfo | null;
export function getIndexedAccessNodeInfo(
    nodeIndexedAccessTypeNode: ts.IndexedAccessTypeNode | ts.Node
): FormMappingIndexedAccessTypeInfo | null;

/**
 * uses the more general function @see {@link getIndexedAccessNodeTypeInfo} - you might like this one more ;)
 * @param node
 * @returns
 */
export function getIndexedAccessNodeInfo(
    node: ts.Node
): FormMappingIndexedAccessTypeInfo | null {
    try {
        return getIndexedAccessNodeTypeInfo<
            ts.TypeReferenceNode | ts.TypeLiteralNode
        >(node, isTypeReferenceNodeOrTypeLiteralNode);
    } catch (err) {
        throw logAndError(
            "Failed to resolve Indexed Access Node Info. As of now only reference and typeliterals are allowed",
            err
        );
    }
}
