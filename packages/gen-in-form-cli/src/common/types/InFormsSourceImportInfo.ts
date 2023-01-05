import ts from "typescript";

export type InFormsSourceImportInfo = {
    declaration: ts.ImportDeclaration;

    fileReference: ts.FileReference | null;
    resolvedModule: ts.ResolvedModuleWithFailedLookupLocations | null;
};
