import type { InFormCliArguments } from "@src/common/types/InFormCliArguments";
import { getTypescriptFilesPatterns } from "./FilePatterns";
import path from "path";

const basePath = path.join(
    "node_modules",
    "@derfrodo",
    "gen-in-form-cli",
    "dist"
);
export const getDefaultArgs = (): InFormCliArguments => {
    const result: InFormCliArguments = {
        loglevel: "info",
        srcFolder: "./src",
        mappingFilesPattern: getTypescriptFilesPatterns(),
        globalSettingsFilesPattern: getTypescriptFilesPatterns(),
        programFilesPattern: getTypescriptFilesPatterns(),
        logAsts: false,
        fileEncoding: "utf-8",
        templatePartialsPath: path.join(
            basePath,
            "templates",
            "muiDemoForms",
            "partials"
        ),
        templatesPath: path.join(basePath, "templates", "muiDemoForms"),
        templateGenerateOncePath: [],
        templatePartialsRecursive: true,

        templateScaffoldOncePath: [],
        templateScaffoldPath: [],
    };
    return result;
};
