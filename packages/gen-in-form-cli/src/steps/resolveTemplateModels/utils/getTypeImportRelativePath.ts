import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { getTypeImportRelativePathToSourceFile } from "./getTypeImportRelativePathToSourceFile";
import { getTypeQueryImportRelativePath } from "./getTypeQueryImportInfo";

export function getTypeImportRelativePath(type: ts.TypeNode): string | null {
    // TODO CHECK FOR IMPORT
    const log = getGeneratorLogger();
    let relativeImport: string | null = null;
    if (!ts.isTypeQueryNode(type)) {
        const sf = type.getSourceFile();
        relativeImport = getTypeImportRelativePathToSourceFile(type, sf);
    } else {
        relativeImport = getTypeQueryImportRelativePath(type);
    }
    if (relativeImport === null) {
        log.warn("No relative import found for type", { type: type.getText() });
    }
    return relativeImport;
}
