import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { getTypescriptFilesPatterns } from "../FilePatterns";

export const getDefaultArgsSearchGeneralSettingsIntegrationTestBaseTests: typeof getDefaultArgs =
    () => {
        const result: ReturnType<typeof getDefaultArgs> = {
            loglevel: "info",
            srcFolder: "./testdata/graphqlTests",
            mappingFilesPattern: getTypescriptFilesPatterns(),
            globalSettingsFilesPattern: getTypescriptFilesPatterns(),
            programFilesPattern: getTypescriptFilesPatterns(),
            logAsts: false,
            fileEncoding: "utf-8",
            templatePartialsRecursive: true,
            templatePartialsPath: "./src/templates/muiDemoForms/partials",
            templatesPath: "./src/templates/muiDemoForms",
            templateGenerateOncePath: [],
            templateScaffoldPath: [],
            templateScaffoldOncePath: [],
        };
        return result;
    };
