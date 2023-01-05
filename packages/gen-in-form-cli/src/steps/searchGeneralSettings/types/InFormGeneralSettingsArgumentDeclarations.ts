import { DeclarationForType } from "@src/common/types/DeclarationForType";
import ts from "typescript";

export interface InFormGeneralSettingsArgumentDeclarations {
    /**
     * For the Property Information which can be expected as index in mapping types
     */
    propertyNameType: DeclarationForType & PropertyNames;

    /**
     * This is the representation of the second argument of @see {@link InFormGeneralSettings} interface
     * eg:
     *
     * export interface FormSettings extends InFormGeneralSettings<FormFieldTypes, FM> and
     * type AppFormDataTypes = InFormDataTypes<FormFieldTypes, string>;
     * interface FM extends AppFormDataTypes {}
     *
     * mappingType will contain the infos for FM then
     */
    mappingType: DeclarationForType;

    /**
     * Will be undefined if not set at all
     */
    additionalType: DeclarationForType | undefined;
}

export interface PropertyNames {
    enumeration: ts.EnumDeclaration | null;
}
