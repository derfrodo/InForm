import {
    InFormDataTypes, InFormDataTypeWithDefaultValueAndComponent,
    InFormGeneralSettings
} from "@derfrodo/gen-in-form-runtime";
import { StringComponent } from "./StringComponent";

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
    ["strng"]: InFormDataTypeWithDefaultValueAndComponent<
        "STRING",
        string,
        "Default String",
        typeof StringComponent
    >;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PickGeneralSettings extends InFormGeneralSettings<FM> { }
