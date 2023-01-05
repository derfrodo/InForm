import ts from "typescript";

export type TypescriptTypeNodeSpecializationTypeguard<
    TInnerType extends ts.TypeNode
> = (obj: ts.TypeNode) => obj is TInnerType;
