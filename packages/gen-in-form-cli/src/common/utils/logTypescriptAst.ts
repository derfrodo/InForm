import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";

export function logTypescriptAst(
    sourceFile: ts.SourceFile,
    nodes: ReadonlyArray<ts.Node> = sourceFile.statements
): void {
    const log = getGeneratorLogger();
    for (const node of nodes) {
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        const result = printer.printNode(
            ts.EmitHint.Unspecified,
            node,
            sourceFile
        );
        log.info(result);
    }
}
