import { getImportedFilesWithResolvedModuleFromSourceFile } from "@src/common/utils/getImportedFilesWithResolvedModuleFromSourceFile";
import { getNodeSymbol } from "@src/common/utils/getNodeSymbol";
import { getTypeChecker } from "@src/common/utils/getTypeChecker";
import { getTypescriptSourceFile } from "@src/common/utils/typescript/getTypescriptSourceFile";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";

export function getTypeQuerySourceFile(
    type: ts.TypeQueryNode
): ts.SourceFile | null {
    const log = getGeneratorLogger();
    const sf = type.getSourceFile();
    const checker = getTypeChecker();
    const typeToTest = type.exprName;
    const symbol = getNodeSymbol(typeToTest, checker);
    const data = getImportedFilesWithResolvedModuleFromSourceFile(sf);

    if (symbol && symbol.declarations) {
        if (symbol.declarations.length === 1) {
            const dec = symbol.declarations.at(0);
            let parent = dec?.parent;
            while (parent && !ts.isImportDeclaration(parent)) {
                parent = parent?.parent;
            }
            const importDeclaration = parent;
            if (
                importDeclaration &&
                ts.isImportDeclaration(importDeclaration)
            ) {
                const moduleSpec = importDeclaration.moduleSpecifier;
                const modulePath = ts.isLiteralExpression(moduleSpec)
                    ? moduleSpec.text
                    : moduleSpec.getText();
                log.debug("Find module with path ", { modulePath });
                const resolved = data.find(
                    (d) => d.fileReference?.fileName === modulePath
                );

                const docMod = resolved?.resolvedModule?.resolvedModule
                    ?.resolvedFileName
                    ? getTypescriptSourceFile(
                          resolved?.resolvedModule?.resolvedModule
                              ?.resolvedFileName
                      )
                    : null;
                return docMod;
            } else {
                throw logAndError(
                    "Failed to resolve import for node. Declaration has no import declaration as parent.",
                    type.getText()
                );
            }
        } else {
            throw logAndError(
                "Failed to resolve import for node. Found symbol, but not a unique declaration.",
                type.getText()
            );
        }
    } else {
        throw logAndError(
            "No symbol or no declaration has been found.",
            type.getText()
        );
    }
}
