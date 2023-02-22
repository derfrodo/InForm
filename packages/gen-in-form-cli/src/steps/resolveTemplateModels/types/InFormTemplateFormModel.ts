import { MappedLiteralSymbolInfoLiteralTypes } from "@src/steps/createFormModells/types/MappedSymbolForPropertyFromGeneralSetting";
import { AdditionalTypeInfo } from "./AdditionalTypeInfo";
import type {
    DefaultValueModel,
    InFormTemplatePropertyOrMemberMappingModel,
} from "./InFormTemplatePropertyOrMemberMappingModel";
import type { InFormTemplateTypeInfoModel } from "./InFormTemplateTypeInfoModel";
import { MatchingInFormTeplateMember } from "./MatchingInFormTeplateMember";
import { MergedImportTemplateModel } from "./MergedImportTemplateModel";

export type InFormTemplateDefaultValuesMap = {
    [key in string]: {
        value?: string | undefined;
        type?: MappedLiteralSymbolInfoLiteralTypes | undefined;
        name: string;
    } & DefaultValueModel;
};

export interface InFormTemplateFormModel {
    interfaceName: string;
    name: string;
    sourceFile: string;
    sourceDirectory: string;
    sourceDirectoryName: string;

    generalSettings: {
        sourceFile: string;
        sourceDirectory: string;
        sourceDirectoryName: string;
        relativeImport: string | null;
        relativePath: string | null;
    };

    inputTypeInfo: InFormTemplateTypeInfoModel | null;
    detailsTypeInfo: InFormTemplateTypeInfoModel | null;

    mappedInputProperties: InFormTemplatePropertyOrMemberMappingModel[];
    mappedInputMembers: InFormTemplatePropertyOrMemberMappingModel[];

    mappedDetailsProperties: InFormTemplatePropertyOrMemberMappingModel[];
    mappedDetailsMembers: InFormTemplatePropertyOrMemberMappingModel[];

    mergedImports: MergedImportTemplateModel[];

    matchingMembers: MatchingInFormTeplateMember[];

    byOrdering: Partial<MatchingInFormTeplateMember>[];
    defaultValues: InFormTemplateDefaultValuesMap;

    inputsWithMatchingDetails: MatchingInFormTeplateMember[];
    inputsWithoutDetails: InFormTemplatePropertyOrMemberMappingModel[];
    detailsWithoutInputs: InFormTemplatePropertyOrMemberMappingModel[];

    inputRestrictionsValueType: AdditionalTypeInfo | null;
    getInputRestrictionsFunctionValueType: AdditionalTypeInfo | null;

    validationRulesValueType: AdditionalTypeInfo | null;
    validationFunctionValueType: AdditionalTypeInfo | null;

    mergedadditionalImports: MergedImportTemplateModel[];

    additionals?: any | null;
}
