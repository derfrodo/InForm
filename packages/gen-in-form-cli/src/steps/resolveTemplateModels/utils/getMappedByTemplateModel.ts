import { logAndError } from "@src/logging/logAndThrow";
import { FormModell } from "@src/steps/createFormModells/types/FormModell";
import {
    isMappedLiteralSymbolInfo,
    isMappedLiteralTypeSymbolInfo,
    isMappedReferenceSymbolInfo,
    MappedLiteralSymbolInfoLiteralTypes,
    MappedSymbolForPropertyFromGeneralSetting,
    MappedSymbolInfo,
} from "@src/steps/createFormModells/types/MappedSymbolForPropertyFromGeneralSetting";
import ts from "typescript";
import {
    DefaultValueModel,
    MappedSymbolInformTemplateModel,
} from "../types/InFormTemplatePropertyOrMemberMappingModel";
import { createAdditionalTypeInfoRelativToNode } from "./createAdditionalTypeInfoRelativToNode";
import { createTypeofTypeInfoRelativToNode } from "./createTypeofTypeInfoRelativToNode";
import { getStringFromSymbol } from "./getStringFromSymbol";

export function getDefaultValueForMappedSymbolInfo(
    info: MappedSymbolInfo | null
): DefaultValueModel | null {
    if (!info) {
        return null;
    }
    if (
        !isMappedLiteralTypeSymbolInfo(info) &&
        !isMappedLiteralSymbolInfo(info) &&
        !isMappedReferenceSymbolInfo(info)
    ) {
        throw logAndError(
            `As of now only literal nodes are allowed for default value.`,
            { info }
        );
    }
    if (
        isMappedReferenceSymbolInfo(info) &&
        !ts.isQualifiedName(info.node.typeName)
    ) {
        throw logAndError(
            `Reference Nodes must contain qualified typename as typename.`,
            { info }
        );
    }

    const value = isMappedReferenceSymbolInfo(info)
        ? info.node.typeName.getText()
        : getStringFromSymbol(info);
    if (typeof value !== "string") {
        throw logAndError(
            `Value is expected to be resolvable to a string for default value.`,
            { info, value }
        );
    }
    return {
        defaultValueModel: "defaultValueModel",
        value: value,
        type:
            info.literalType ??
            MappedLiteralSymbolInfoLiteralTypes.qualifiedName,
    };
}

export function getMappedByTemplateModel(
    m: MappedSymbolForPropertyFromGeneralSetting,
    model: FormModell
): MappedSymbolInformTemplateModel {
    return {
        mappingPropertySignatureKey: m.mappingPropertySignatureKey,

        componentType: m.componentType
            ? ts.isTypeQueryNode(m.componentType)
                ? createTypeofTypeInfoRelativToNode(
                      m.componentType,
                      model.data.mapNode
                  )
                : createAdditionalTypeInfoRelativToNode(
                      m.componentType,
                      model.data.mapNode
                  )
            : null,
        values: m.values,

        // matcher: getStringFromSymbol(m.matcherForProperty),

        inputTypeName: getStringFromSymbol(m.dataType),
        defaultValue: getDefaultValueForMappedSymbolInfo(m.defaultValue),
        key: getStringFromSymbol(m.fieldIdentifier),
    };
}
