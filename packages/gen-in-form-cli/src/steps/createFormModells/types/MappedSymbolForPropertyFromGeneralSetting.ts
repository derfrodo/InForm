import { DeclarationForType } from "@src/common/types/DeclarationForType";
import ts from "typescript";
import { InFormEnumValue } from "./InFormEnumValue";
import { PropertyMappingMatcher } from "./PropertyMappingMatcher";

/**
 * This interface will contain the information about property mapping
 *
 * export interface FormSettings extends InFormGeneralSettings<FormFieldTypes, FM> and
 * type AppFormDataTypes = InFormDataTypes<FormFieldTypes, string>;
 * interface FM extends AppFormDataTypes { [FormFieldTypes.STRING]: InFormDataType<FormFieldTypes.STRING, string> }
 *
 * MappedSymbolForPropertyFromGeneralSetting will be a single, resolved prop in FM like "InFormDataType<FormFieldTypes.STRING, string>" then
 */
export interface MappedSymbolForPropertyFromGeneralSetting {
    fieldIdentifier: MappedSymbolInfo | null;
    dataType: MappedSymbolInfo | null;
    matcherForProperty: PropertyMappingMatcher | null;

    defaultValue: MappedSymbolInfo | null;

    mappingSymbol: ts.Symbol;
    mappingPropertySignatureKey: string;

    values: InFormEnumValue[];

    componentType: ts.TypeNode | null;
}

export type MappedSymbolInfo = MappedSymbolInfoBase &
    (
        | MappedReferenceSymbolInfo
        | MappedTokenSymbolInfo
        | MappedIndexedSymbolInfo
        | MappedLiteralSymbolInfo
        | MappedUnknownSymbolInfo
        | MappedLiteralTypeSymbolInfo
    );

export enum MappedSymbolInfoTypes {
    UNKNOWN = "UNKNOWN",
    REFERENCETYPE = "REFERENCETYPE",
    LITERAL = "LITERAL",
    LITERALTYPE = "LITERALTYPE",
    INDEXED = "INDEXED",
    TOKEN = "TOKEN",
}

export enum MappedLiteralSymbolInfoLiteralTypes {
    unknown = "unknown",
    string = "string",
    number = "number",
    boolean = "boolean",
    null = "null",
    undefined = "undefined",
    /**
     * This is a fallback for type references used for default values
     */
    qualifiedName = "qualifiedName",
}

export function isMappedLiteralTypeSymbolInfo(
    info: MappedSymbolInfoBase | null
): info is MappedLiteralSymbolInfo {
    return (
        typeof info === "object" &&
        info?.type === MappedSymbolInfoTypes.LITERALTYPE
    );
}
export function isMappedLiteralSymbolInfo(
    info: MappedSymbolInfoBase | null
): info is MappedLiteralSymbolInfo {
    return (
        typeof info === "object" && info?.type === MappedSymbolInfoTypes.LITERAL
    );
}
export function isMappedReferenceSymbolInfo(
    info: MappedSymbolInfoBase | null
): info is MappedLiteralSymbolInfo & { node: ts.TypeReferenceNode } {
    return (
        typeof info === "object" &&
        info?.type === MappedSymbolInfoTypes.REFERENCETYPE &&
        info?.node &&
        ts.isTypeReferenceNode(info.node)
    );
}

export type MappedSymbolInfoBase = {
    node: ts.TypeNode;
    symbol: ts.Symbol | string | null;
    type: MappedSymbolInfoTypes;
    declaration?: DeclarationForType | null;
    isArray?: boolean;
};

export type MappedUnknownSymbolInfo = MappedSymbolInfoBase & {
    type: MappedSymbolInfoTypes.UNKNOWN;
};

export type MappedReferenceSymbolInfo = MappedSymbolInfoBase & {
    declaration: DeclarationForType | null;
    type: MappedSymbolInfoTypes.REFERENCETYPE;
};

export type MappedTokenSymbolInfo = MappedSymbolInfoBase & {
    type: MappedSymbolInfoTypes.TOKEN;
};

export type MappedLiteralTypeSymbolInfo = MappedSymbolInfoBase & {
    type: MappedSymbolInfoTypes.LITERALTYPE;
};

export type MappedLiteralSymbolInfo = MappedSymbolInfoBase & {
    type: MappedSymbolInfoTypes.LITERAL;
    literalType: MappedLiteralSymbolInfoLiteralTypes;
};

export type MappedIndexedSymbolInfo = MappedSymbolInfoBase & {
    objectNode: ts.TypeNode;
    indexNode: ts.TypeNode;
    index: MappedSymbolInfo;
    objectType: MappedSymbolInfo;
    type: MappedSymbolInfoTypes.INDEXED;
};
