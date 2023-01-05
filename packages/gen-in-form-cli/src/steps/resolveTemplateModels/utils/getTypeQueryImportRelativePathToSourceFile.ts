import { getRelativeImport } from "@src/common/utils/typescript/getRelativeImport";
import ts from "typescript";
import { getTypeQuerySourceFile } from "./getTypeQuerySourceFile";

export function getTypeQueryImportRelativePathToSourceFile(
    type: ts.TypeQueryNode,
    referenceSourceFile: ts.SourceFile
): string | null {
    const sf = referenceSourceFile;
    const docMod = getTypeQuerySourceFile(type);
    const relativeImport = docMod ? getRelativeImport(sf, docMod) : null;
    return relativeImport;
}
