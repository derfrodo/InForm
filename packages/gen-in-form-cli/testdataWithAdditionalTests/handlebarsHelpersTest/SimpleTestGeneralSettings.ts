import {
    InFormDataTypes,
    InFormDataTypeWithDefaultValue,
    InFormGeneralSettings,
} from "@derfrodo/gen-in-form-runtime";

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
    ["String"]: InFormDataTypeWithDefaultValue<"String", string, "">;
    ["OtherString"]: InFormDataTypeWithDefaultValue<"String2", string, "">;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SimpleTestGeneralSettings extends InFormGeneralSettings<FM> {}
