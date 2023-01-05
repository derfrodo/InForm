import { getAbsolutePath } from "@src/common/utils/getAbsolutePath";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import path from "path";
import ts from "typescript";
import { isPathWithNestedFolders } from "./isPathWithNestedFolders";

export function getRelativeImport(
    doc: ts.SourceFile,
    moduleToImport: ts.SourceFile
): string | null {
    const log = getGeneratorLogger();
    const pathReferenceModule = doc.fileName;
    const pathImportModule = moduleToImport.fileName;
    const absolutePathReferenceModule = getAbsolutePath(doc);
    const absolutePathImportModule = getAbsolutePath(moduleToImport);

    if (
        absolutePathReferenceModule === null ||
        absolutePathImportModule === null
    ) {
        log.error("Failed to resolve relative paths for import module.", {
            importName: pathImportModule,
            referenceDoc: pathReferenceModule,
        });
        return null;
    }
    const directoryReferenceModule = path.dirname(absolutePathReferenceModule);
    const directoryImportModule = path.dirname(absolutePathImportModule);
    let commonBase = directoryReferenceModule;

    let levelUp = 0;
    while (
        !directoryImportModule.startsWith(commonBase) &&
        isPathWithNestedFolders(commonBase)
    ) {
        levelUp++;
        commonBase = commonBase.substring(
            0,
            commonBase.indexOf("/") >= 0
                ? commonBase.lastIndexOf("/")
                : commonBase.lastIndexOf("\\")
        );
    }
    if (!isPathWithNestedFolders(commonBase)) {
        log.error(
            "Common path is no longer path with slashes - this is highly unlikely.",
            {
                commonBase,
                importName: pathImportModule,
                referenceDoc: pathReferenceModule,
            }
        );
        return null;
    }

    const result = `./${Array.from(Array(levelUp))
        .map(() => "..")
        .join("/")}${levelUp > 0 ? "/" : ""}${absolutePathImportModule
        .substring(commonBase.length + 1)
        .replace(/\\/g, "/")
        .replace(/\.ts(x)?$/, "")}`;

    return result;
}
