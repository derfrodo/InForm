import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { getTypescriptFilesPatterns } from "../FilePatterns";

export const getDefaultPerformStepsIntegrationTestsArgsBaseTests: typeof getDefaultArgs =
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
            templatePartialsPath: ["./testdata/testTemplates/partials"],
            templatesPath: "./testdata/testTemplates",
            templateGenerateOncePath: [],
            templateScaffoldPath: [],
            templateScaffoldOncePath: [],
        };
        return result;
    };
