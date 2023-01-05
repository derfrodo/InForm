import ts from "typescript";

export type PropertyMappingMatcher = {
    match: (property: ts.PropertySignature) => boolean;
    matcherTypeNode: ts.TypeNode | null;
};
