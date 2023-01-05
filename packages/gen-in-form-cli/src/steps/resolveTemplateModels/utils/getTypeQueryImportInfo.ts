import ts from "typescript";
import { getTypeQueryImportRelativePathToSourceFile } from "./getTypeQueryImportRelativePathToSourceFile";

export function getTypeQueryImportRelativePath(
    type: ts.TypeQueryNode
): string | null {
    const sf = type.getSourceFile();
    return getTypeQueryImportRelativePathToSourceFile(type, sf);
}
