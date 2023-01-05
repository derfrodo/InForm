import type {
    InFormGeneralSettings,
    InFormDataType,
    InFormDataTypes,
    InFormPropertyMatcherRegexRegex,
    InFormEnumDataType,
    InFormDataTypeWithDefaultValue
} from "@derfrodo/gen-in-form-runtime";
import { Genders, Scalars } from "../graphql/generated";


/**
 * This will be my form field keys
 * Default solution might have them as name for partials?
 */
enum FormFieldTypes {
    STRING = "STRING",
    DATE = "DATE",
    SELECT = "SELECT",
    AGE = "AGE",
    INTEGER = "INTEGER",
}

/**
 * Alias just for readability
 */
type AppFormDataTypes = InFormDataTypes<FormFieldTypes, string>

const ageTest = /age/;

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends AppFormDataTypes {
    [FormFieldTypes.STRING]: InFormDataTypeWithDefaultValue<FormFieldTypes.STRING, string, "123">
    [FormFieldTypes.DATE]: InFormDataTypeWithDefaultValue<FormFieldTypes.DATE, Scalars['DateTime'], "1984-04-04">

    ["GRAPHQLSTRING"]: InFormDataTypeWithDefaultValue<FormFieldTypes.STRING, Scalars['String'], "1984-04-04">

    [FormFieldTypes.SELECT]: InFormEnumDataType<FormFieldTypes.SELECT, Genders, Genders.D>
    ["ReadonlyAge"]: InFormDataType<FormFieldTypes.AGE, number | null>
    ["ReadonlyString"]: InFormDataType<FormFieldTypes.STRING, string | null>

    [FormFieldTypes.AGE]: InFormDataType<FormFieldTypes.AGE, Scalars['Int'], InFormPropertyMatcherRegexRegex<typeof ageTest>>
    [FormFieldTypes.INTEGER]: InFormDataType<FormFieldTypes.INTEGER, Scalars['Int']>
}

export interface FormSettings extends InFormGeneralSettings<FM> {

}