import {
    InFormDataTypes, InFormDataTypeWithDefaultValue,
    InFormGeneralSettings
} from "@derfrodo/gen-in-form-runtime";
import { ObjectWithComplexProperties } from "./ObjectWithComplexProperties";

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
    ["ObjectWithComplexProperties"]: InFormDataTypeWithDefaultValue<
        "ObjectWithComplexProperties",
        ObjectWithComplexProperties,
        null
    >;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NestedPropsTestsGeneralSettings extends InFormGeneralSettings<FM> { }
