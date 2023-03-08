import type { LogLevel } from "./LogLevel";
import type { FileEncoding } from "./FileEncoding";
import type { PathInfo } from "./PathInfo";

export type InFormCliArguments = {
    loglevel: LogLevel;
    fileEncoding: FileEncoding;

    srcFolder: string;
    globalSettingsFilesPattern: string[];
    mappingFilesPattern: string[];
    /**
     * normally expected to be ts or tsx files ;)
     */
    programFilesPattern: string[];
    logAsts?: boolean;

    templatesPath: PathInfo;
    templateGenerateOncePath: PathInfo;

    templateScaffoldOncePath: PathInfo;
    templateScaffoldPath: PathInfo;

    templatePartialsPath: PathInfo;
    templatePartialsRecursive: boolean;
};
