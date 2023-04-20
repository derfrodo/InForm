import { InFormEnumValue } from "@src/steps/createFormModells/types/InFormEnumValue";
import { MappedLiteralSymbolInfoLiteralTypes } from "@src/steps/createFormModells/types/MappedSymbolForPropertyFromGeneralSetting";
import { AdditionalTypeInfo } from "./AdditionalTypeInfo";

export function isInFormTemplatePropertyOrMemberMappingModel(
    obj: any
): obj is InFormTemplatePropertyOrMemberMappingModel {
    return (
        typeof obj === "object" &&
        obj !== undefined &&
        obj !== null &&
        obj.propertyOrMemberModel === "propertyOrMemberModel"
    );
}

export interface InFormTemplatePropertyOrMemberMappingModel {
    propertyOrMemberModel: "propertyOrMemberModel";
    referencingModel: {
        file: string;
        absoluteFilePath: string | null;
    };
    name: string | null;
    typeName: string;
    typeNameFull: string;
    relativeImport: string | null;

    mappedBy: MappedSymbolInformTemplateModel[];
    firstMapping: MappedSymbolInformTemplateModel | null;

    nestedPropertyNames?: string[];
}

export function isDefaultValueModel(obj: any): obj is DefaultValueModel {
    return (
        typeof obj === "object" &&
        obj !== undefined &&
        obj !== null &&
        obj.defaultValueModel === "defaultValueModel"
    );
}
export type DefaultValueModel = {
    defaultValueModel: "defaultValueModel";
    value?: string;
    type?: MappedLiteralSymbolInfoLiteralTypes | undefined;
};

export type MappedSymbolInformTemplateModel = {
    mappingPropertySignatureKey: string | null;
    inputTypeName: string | null;

    componentType: AdditionalTypeInfo | null;
    defaultValue: DefaultValueModel | null;
    values: InFormEnumValue[];
    key: string | null;

    // name: string;
};
