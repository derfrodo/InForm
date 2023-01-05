import ts from "typescript";
import { TypeForIndexedAccessTypeInfo } from "./TypeForIndexedAccessTypeInfo";

export type FormMappingIndexedAccessTypeInfo = TypeForIndexedAccessTypeInfo & {
    type: ts.TypeReferenceNode | ts.TypeLiteralNode;
    outerType: ts.IndexedAccessTypeNode;
};
