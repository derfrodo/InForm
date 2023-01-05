import ts from "typescript";

export function getSourceFileFromSymbol(
    symbol?: ts.Symbol | null
): ts.SourceFile | null {
    const declarations = symbol?.declarations;
    const sourceFile =
        declarations && declarations.length === 1
            ? declarations[0].getSourceFile()
            : null;
    return sourceFile;
}
