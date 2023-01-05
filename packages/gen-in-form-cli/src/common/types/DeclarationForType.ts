import ts from "typescript";

export type DeclarationForType = {
    symbol: ts.Symbol | null | undefined;
    declaration: ts.Type | null;
    sourceFile: ts.SourceFile | null;

    /**
     * Please find my properties here.
     * This may be helpful for your mappings ;)
     */
    properties: ts.Symbol[] | null;

    /**
     * Please find my properties here.
     * This may be helpful for your mappings ;)
     */
    members: ts.PropertySignature[] | null;

    /**
     * This node has been used to resolve this declaration ;)
     */
    baseTypeNode:
        | ts.EntityName
        | ts.TypeReferenceNode
        | ts.TypeLiteralNode
        | ts.Node
        | null
        | undefined;

    typeArgumentDeclarations?: (DeclarationForType | null)[] | null;
};
