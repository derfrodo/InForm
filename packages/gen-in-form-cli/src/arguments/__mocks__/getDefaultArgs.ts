import { getTypescriptFilesPatterns } from "../FilePatterns";
import { getDefaultArgs as getDefaultArgsOrig } from "../getDefaultArgs";

export const getDefaultArgs: typeof getDefaultArgsOrig = () => {
    const result: ReturnType<typeof getDefaultArgsOrig> = {
        loglevel: "info",
        srcFolder: "./testdata",
        mappingFilesPattern: getTypescriptFilesPatterns(),
        globalSettingsFilesPattern: getTypescriptFilesPatterns(),
        programFilesPattern: getTypescriptFilesPatterns(),
        logAsts: false,
        fileEncoding: "utf-8",
    };
    return result;
};
