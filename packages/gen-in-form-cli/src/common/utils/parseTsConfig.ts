// see also: https://stackoverflow.com/questions/71815527/typescript-compiler-apihow-to-get-absolute-path-to-source-file-of-import-module

import { join } from "path";
import ts from "typescript";
import { readFileAsStringSync } from "./readFileAsStringSync";

export function parseTsConfig(
    pathToTsconfig?: string | null,
    baseProjectPath?: string | null,
    encoding: BufferEncoding = "utf8"
): ts.ParsedCommandLine {
    const cwd = process.cwd();
    const content = readFileAsStringSync(
        pathToTsconfig ?? join(cwd, "tsconfig.json"),
        encoding
    );

    const tsConfigObject = ts.parseJsonConfigFileContent(
        JSON.parse(content),
        ts.sys,
        baseProjectPath ?? cwd
    );
    return tsConfigObject;
}
