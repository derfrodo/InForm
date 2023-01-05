import type { DeclarationForType } from "@src/common/types/DeclarationForType";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import ts from "typescript";
import { InFormMappingDefaultValueType } from "../utils/visitors/getDefaultValuesFromInFormMapping";
import { FormMappingOrderingTypeInfo } from "./FormMappingOrderingTypeInfo";

export type FormMappingData = {
    sourceFile: InFormSourceFile;
    mapNode: ts.InterfaceDeclaration | ts.TypeAliasDeclaration;
    /**
     * The text of the interface node (might be helpful some time)
     */
    mappingInterface: string;

    /**
     * The name of the interface node (might be helpful some time)
     */
    mappingInterfaceName: string | null;

    inputTypeDetails: DeclarationForType | null;
    detailsTypeDetails: DeclarationForType | null;
    indexedDetailsTypeDetails: DeclarationForType | null;

    orderingType: FormMappingOrderingTypeInfo | null;
    defaultValuesType: InFormMappingDefaultValueType;
    nameValueType: ts.LiteralTypeNode | null;

    validationRulesValueType: ts.TypeNode | null;
    validationFunctionValueType: ts.TypeQueryNode | null;
    inputRestrictionsValueType: ts.TypeNode | null;
    getInputRestrictionsFunctionValueType: ts.TypeQueryNode | null;
};
