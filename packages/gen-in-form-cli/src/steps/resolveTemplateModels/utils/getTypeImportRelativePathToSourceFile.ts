import { getDeclarationForType } from "@src/common/utils/getDeclarationForType";
import { getRelativeImport } from "@src/common/utils/typescript/getRelativeImport";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { getTypeQueryImportRelativePathToSourceFile } from "./getTypeQueryImportRelativePathToSourceFile";

export function getTypeImportRelativePathToSourceFile(
    type: ts.TypeNode,
    referenceSourceFile: ts.SourceFile
): string | null {
    // TODO CHECK FOR IMPORT
    const log = getGeneratorLogger();
    let relativeImport: string | null = null;
    if (!ts.isTypeQueryNode(type)) {
        const dec = getDeclarationForType(type);
        relativeImport = dec?.sourceFile
            ? getRelativeImport(referenceSourceFile, dec?.sourceFile)
            : null;
    } else {
        relativeImport = getTypeQueryImportRelativePathToSourceFile(
            type,
            referenceSourceFile
        );
    }
    if (relativeImport === null) {
        log.warn("No relative import found for type", { type: type.getText() });
    }
    return relativeImport;
}
