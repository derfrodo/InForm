import {
    InFormDataTypes, InFormDataTypeWithDefaultValueAndComponent,
    InFormGeneralSettings
} from "@derfrodo/gen-in-form-runtime";
import { AliasForBuffer } from "./AliasForBuffer";
import { AliasSomComponent } from "./AliasSomComponent";

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
    ["AliasForBuffer"]: InFormDataTypeWithDefaultValueAndComponent<
        "AliasForBufferIdentifier",
        AliasForBuffer,
        "utf-8",
        typeof AliasSomComponent
    >;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AliasTestsGeneralSettings extends InFormGeneralSettings<FM> { }
