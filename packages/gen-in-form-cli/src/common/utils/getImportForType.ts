import { getTypeName } from "@src/common/utils/typescript/getTypeName";
import { InFormSourceFileImports } from "@src/common/types/InFormSourceFileImports";
import { InFormsSourceImportInfo } from "@src/common/types/InFormsSourceImportInfo";
import ts from "typescript";

export function getImportForType(
    node: ts.EntityName | ts.TypeReferenceNode | null,
    imports: InFormSourceFileImports
): InFormsSourceImportInfo | null {
    const name = getTypeName(node);
    const matchingDetailsImports = imports.imports.filter((i) => {
        const namedBindings = i.declaration.importClause?.namedBindings;
        switch (namedBindings?.kind) {
            case ts.SyntaxKind.NamedImports:
                if (ts.isNamedImports(namedBindings)) {
                    const es = namedBindings.elements.filter(
                        (e) => e.name.escapedText === name
                    );
                    return es.length > 0;
                }
        }
    });

    return matchingDetailsImports.length === 0
        ? null
        : matchingDetailsImports[0];
}
