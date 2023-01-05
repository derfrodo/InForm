import ts from "typescript";

export function hasImportDeclarationNamedBinding(
    importDeclaration: ts.ImportDeclaration,
    nameOfType: string
): boolean {
    const bindings = importDeclaration.importClause?.namedBindings;

    if (bindings && ts.isNamedImports(bindings)) {
        return (
            bindings.elements.filter((e) => e.name.text === nameOfType).length >
            0
        );
    }

    return false;
}
