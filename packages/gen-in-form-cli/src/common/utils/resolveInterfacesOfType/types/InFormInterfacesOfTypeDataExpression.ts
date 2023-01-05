import ts from "typescript";

export type InFormInterfacesOfTypeDataExpression<T> = ts.TypeReferenceNode & {
    expression: ts.Identifier & {
        text: T;
    };
};
