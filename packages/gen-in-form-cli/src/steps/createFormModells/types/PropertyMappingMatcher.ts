import ts from "typescript";

export type PropertyMappingMatcher = {
    match: (property: ts.PropertySignature | ts.PropertyDeclaration) => boolean;
    matcherTypeNode: ts.TypeNode | null;
};
