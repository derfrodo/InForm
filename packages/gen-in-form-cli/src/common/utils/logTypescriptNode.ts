import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";

export const LogTypescriptNodePrefix = "Typescript Node Info";

export function logTypescriptNode(
    node: ts.Node,
    prefix?: string | undefined | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...additionalMsgs: any[]
): void {
    const log = getGeneratorLogger();
    const nodePrefix = LogTypescriptNodePrefix;
    const stack = new Error().stack;
    if (prefix) {
        log.info(
            prefix,
            nodePrefix,
            ts.SyntaxKind[node.kind],
            node,
            ...additionalMsgs,
            stack
        );
    } else {
        log.info(
            nodePrefix,
            ts.SyntaxKind[node.kind],
            node,
            ...additionalMsgs,
            stack
        );
    }
}

export function debugTypescriptNode(
    node: ts.Node,
    prefix?: string | undefined | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...additionalMsgs: any[]
): void {
    const log = getGeneratorLogger();
    const nodePrefix = LogTypescriptNodePrefix;
    const stack = new Error().stack;
    if (prefix) {
        log.debug(
            prefix,
            nodePrefix,
            ts.SyntaxKind[node.kind],
            node,
            ...additionalMsgs,
            stack
        );
    } else {
        log.debug(
            nodePrefix,
            ts.SyntaxKind[node.kind],
            node,
            ...additionalMsgs,
            stack
        );
    }
}
