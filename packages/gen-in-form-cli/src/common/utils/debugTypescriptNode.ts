import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { LogTypescriptNodePrefix } from "./logTypescriptNode";


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
