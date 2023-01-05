import ts from "typescript";
import { TypeForIndexedAccessTypeInfo } from "./TypeForIndexedAccessTypeInfo";

export type FormMappingOrderingTypeInfo =
    | FormMappingOrderingTypeInfoType
    | FormMappingOrderingTypeInfoEx;

/**
 * @deprecated will hopefully be replaced by typeof, right?
 */
export type FormMappingOrderingTypeInfoType = TypeForIndexedAccessTypeInfo & {
    type: ts.TypeReferenceNode | ts.TypeLiteralNode;
    outerType: ts.IndexedAccessTypeNode;
};

export type FormMappingOrderingTypeInfoEx = Omit<
    TypeForIndexedAccessTypeInfo,
    "type"
> & {
    type: null;
    expression: ts.ObjectLiteralExpression;
};
