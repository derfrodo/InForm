import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";

export function getSingleIndexedAccessTypeIntersectionType(
    intersect: ts.IntersectionTypeNode,
    additionalAllowedNodes?: (node: ts.TypeNode) => boolean
): ts.IndexedAccessTypeNode {
    const log = getGeneratorLogger();

    const f = intersect.types.filter((u) => ts.isIndexedAccessTypeNode(u));

    if (f.length > 1) {
        const msg = `More than one IndexedAccessTypeNode in intersecttype ${intersect.getText()}`;
        log.error(msg);
        throw new Error(msg);
    }
    if (f.length === 0) {
        const msg = `No IndexedAccessTypeNode in intersecttype ${intersect.getText()}`;
        log.error(msg);
        throw new Error(msg);
    }

    if (additionalAllowedNodes) {
        const forbiddenNodes = intersect.types.filter(
            (n) => f.indexOf(n) < 0 && !additionalAllowedNodes(n)
        );
        if (forbiddenNodes.length > 0) {
            throw logAndError(
                `Found forbidden nodes in intersecttype  ${intersect.getText()}`
            );
        }
    }

    const r = f[0];

    if (!ts.isIndexedAccessTypeNode(r)) {
        const msg = `Failed to cast result to IndexedAccessTypeNode in intersecttype ${intersect.getText()}`;
        throw logAndError(msg);
    }
    return r;
}
