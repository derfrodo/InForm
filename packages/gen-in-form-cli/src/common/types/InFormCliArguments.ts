import type { LogLevelDesc } from "loglevel";

export type InFormCliArguments = {
    loglevel: LogLevelDesc;
    fileEncoding: BufferEncoding;

    srcFolder: string;
    globalSettingsFilesPattern: string[];
    mappingFilesPattern: string[];
    /**
     * normally expected to be ts or tsx files ;)
     */
    programFilesPattern: string[];
    logAsts?: boolean;

    templatesPath: string | string[];
    templateGenerateOncePath: string | string[];

    templateScaffoldOncePath: string | string[];
    templateScaffoldPath: string | string[];

    templatePartialsPath: string | string[];
    templatePartialsRecursive: boolean;
};
