import { InFormSourceFileImports } from "@src/common/types/InFormSourceFileImports";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { getImportedFilesWithResolvedModuleFromSourceFile } from "./getImportedFilesWithResolvedModuleFromSourceFile";
import { logTypescriptNode } from "./logTypescriptNode";

export type FileReferenceWithResolvedModule = {
    fileReference: ts.FileReference | null;
    resolvedModule: ts.ResolvedModuleWithFailedLookupLocations | null;
};

// see also: https://stackoverflow.com/questions/71815527/typescript-compiler-apihow-to-get-absolute-path-to-source-file-of-import-module
export async function getImportsFromSourceFile(
    doc: ts.SourceFile
): Promise<InFormSourceFileImports> {
    const log = getGeneratorLogger();
    const fileInfo = ts.preProcessFile(doc.getFullText(doc));
    const result: InFormSourceFileImports = {
        fileInfo: fileInfo,
        imports: [],
    };

    const referencesWithResolvedModules: FileReferenceWithResolvedModule[] =
        getImportedFilesWithResolvedModuleFromSourceFile(doc);

    for await (const node of doc.statements) {
        switch (node.kind) {
            case ts.SyntaxKind.ImportDeclaration:
                if (ts.isImportDeclaration(node)) {
                    const matches = referencesWithResolvedModules.filter(
                        (p) =>
                            // actuall, the file reference seems to ignore the quote
                            p.fileReference?.pos ===
                            node.moduleSpecifier.pos + 1
                    );

                    // const detailsTypeDetails = getDeclarationForType(
                    //     argv,
                    //     node.importClause?.namedBindings?.,
                    //     program
                    // );

                    log.debug(matches);
                    if (matches.length === 1) {
                        result.imports.push({
                            declaration: node,
                            ...matches[0],
                        });
                    } else {
                        result.imports.push({
                            declaration: node,
                            fileReference: null,
                            resolvedModule: null,
                        });
                        log.warn(
                            `No match has been found for import declaration ${node.getFullText(
                                doc
                            )}`
                        );
                    }
                } else {
                    log.warn(
                        `Node is expected to be import, but casting failed (Text ${node.getText(
                            doc
                        )})`
                    );
                    logTypescriptNode(node, null);
                }
                break;
            default:
                break;
        }
    }
    return result;
}
