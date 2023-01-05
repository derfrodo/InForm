import ts from "typescript";

export type TypeForIndexedAccessTypeInfo = {
    type: ts.TypeNode;
    nullable: boolean;
    optional: boolean;
};
