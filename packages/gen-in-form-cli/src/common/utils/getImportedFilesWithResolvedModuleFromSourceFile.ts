import { getCliArgumentsFromStore } from "@src/arguments/getCliArgumentsFromStore";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { parseTsConfig } from "./parseTsConfig";
import { FileReferenceWithResolvedModule } from "./getImportsFromSourceFile";

// see also: https://stackoverflow.com/questions/71815527/typescript-compiler-apihow-to-get-absolute-path-to-source-file-of-import-module
export function getImportedFilesWithResolvedModuleFromSourceFile(
    doc: ts.SourceFile
): FileReferenceWithResolvedModule[] {
    const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();

    const fileInfo = ts.preProcessFile(doc.getFullText(doc));
    const tsconf = parseTsConfig(null, null, argv.fileEncoding);

    const referencesWithResolvedModules: FileReferenceWithResolvedModule[] =
        fileInfo.importedFiles.map((importedModule) => {
            const resolvedImport = ts.resolveModuleName(
                importedModule.fileName,
                doc.fileName,
                tsconf.options,
                ts.sys
            );
            return {
                fileReference: importedModule ?? null,
                resolvedModule: resolvedImport ?? null,
            };
        });

    log.debug(
        `Resolved imports from soruce File "${doc.fileName}"`,
        referencesWithResolvedModules
    );

    return referencesWithResolvedModules;
}
