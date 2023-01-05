import ts from "typescript";
import { TypeForIndexedAccessTypeInfo } from "./TypeForIndexedAccessTypeInfo";

export type FormMappingIndexedAccessNodeTypeInfo<
    TInnerType extends ts.TypeNode
> = TypeForIndexedAccessTypeInfo & {
    type: TInnerType;
    outerType: ts.IndexedAccessTypeNode;
};
