import {
    InFormDataTypes,
    InFormDataTypeWithComponent,
    InFormDataTypeWithDefaultValueAndComponent,
    InFormGeneralSettings
} from "@derfrodo/gen-in-form-runtime";
import { FileEncoding } from "@src/common/types/FileEncoding";
import { PathInfo } from "@src/common/types/PathInfo";
import { LogLevel } from "../../common/types/LogLevel";
import { validateProperty } from "./validateProperty";

// const enabled = /^enabled*/;

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
    ["LogLevel"]: InFormDataTypeWithDefaultValueAndComponent<
        "loglevel",
        LogLevel,
        "info",
        typeof validateProperty
    >;
    ["FileEncoding"]: InFormDataTypeWithDefaultValueAndComponent<
        "FileEncoding",
        FileEncoding,
        "utf8",
        typeof validateProperty
    >;
    ["string"]: InFormDataTypeWithDefaultValueAndComponent<
        "string",
        string,
        "",
        typeof validateProperty
    >;

    ["string[]"]: InFormDataTypeWithComponent<
        "string[]",
        string[],
        typeof validateProperty
    >;


    ["PathInfo"]: InFormDataTypeWithComponent<
        "PathInfo_key",
        PathInfo,
        typeof validateProperty
    >;

    
    // ["ENABLED"]: InFormDataTypeWithDefaultValueAndComponent<"ENABLED", LogLevelDesc, true, typeof validateProperty, InFormPropertyMatcherRegexRegex<typeof enabled>>
    // ["TOGGLE"]: InFormDataTypeWithDefaultValueAndComponent<"TOGGLE", boolean, false, typeof RhfSwitch>

    // ["STRING"]: InFormDataTypeWithDefaultValueAndComponent<"STRING", string, "", typeof RhfTextInput>
    // ["INTEGER"]: InFormDataTypeWithDefaultValueAndComponent<"INTEGER", number, 0, typeof RhfNumericTextInput>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ValidatorGeneralSettings extends InFormGeneralSettings<FM> { }
