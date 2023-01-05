import type {
    InFormDataType,
    InFormDataTypes,
    InFormEnumDataType,
    InFormGeneralSettings,
} from "@derfrodo/gen-in-form-runtime";
import { Genders, Scalars } from "../graphql/generated";

/**
 * This will be my form field keys
 * Default solution might have them as name for partials?
 */
enum FormFieldTypes {
    GRAPHQLSTRING = "GRAPHQLSTRING",
    STRING = "STRING",
    DATE = "DATE",
    SELECT = "SELECT",
}

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes< string, string> {
    [FormFieldTypes.STRING]: InFormDataType<FormFieldTypes.STRING, string>;
    [FormFieldTypes.GRAPHQLSTRING]: InFormDataType<
        FormFieldTypes.GRAPHQLSTRING,
        Scalars["String"]
    >;
    [FormFieldTypes.DATE]: InFormDataType<FormFieldTypes.DATE, string>;
    // [FormFieldTypes.SELECT]: InFormDataType<FormFieldTypes.SELECT, Genders>
    [FormFieldTypes.SELECT]: InFormEnumDataType<
        FormFieldTypes.SELECT,
        Genders,
        Genders.D
    >;
}

export type IgnoreThisFormSettings = InFormGeneralSettings<
    FM,
    {}
>;

export interface ActualFormSettings
    extends InFormGeneralSettings<FM> {
    test: boolean;
}
