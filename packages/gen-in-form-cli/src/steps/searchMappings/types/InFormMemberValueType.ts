import ts from "typescript";

export type InFormMemberValueType<Type extends ts.TypeNode> =
    | (ts.TypeNode & Type)
    | null;
