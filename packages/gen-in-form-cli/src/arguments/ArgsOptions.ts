import { LogLevelDesc } from "loglevel";
import { Options } from "yargs";
import type { CliArgs } from "../common/types/CliArgs";
import { getDefaultArgs } from "./getDefaultArgs";

const logLevelChoices: ReadonlyArray<LogLevelDesc> = [
    0,
    "TRACE",
    "DEBUG",
    "INFO",
    "WARN",
    "ERROR",
    "SILENT",
    1,
    2,
    3,
    4,
    5,
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "silent",
];

export const ArgsOptions: { [key in keyof CliArgs]: Options } = {
    fileEncoding: {
        demandOption: false,
        default: "utf8",
    },
    loglevel: {
        choices: logLevelChoices,
        demandOption: false,
        default: getDefaultArgs().loglevel,
    },
    srcFolder: {
        demandOption: false,
        default: getDefaultArgs().srcFolder,
    },
    mappingFilesPattern: {
        demandOption: false,
        default: getDefaultArgs().mappingFilesPattern,
    },
    globalSettingsFilesPattern: {
        demandOption: false,
        default: getDefaultArgs().globalSettingsFilesPattern,
    },
    programFilesPattern: {
        demandOption: false,
        default: getDefaultArgs().programFilesPattern,
    },
    templatesPath: {
        demandOption: false,
        type: "array",
        default: getDefaultArgs().templatesPath,
    },
    templatePartialsPath: {
        demandOption: false,
        type: "array",
        default: getDefaultArgs().templatePartialsPath,
    },
    templateGenerateOncePath: {
        demandOption: false,
        type: "array",
        default: getDefaultArgs().templateGenerateOncePath,
    },
    templatePartialsRecursive: {
        demandOption: false,
        default: getDefaultArgs().templatePartialsRecursive,
    },
    templateScaffoldOncePath: {
        demandOption: false,
        default: getDefaultArgs().templateScaffoldOncePath,
    },
    templateScaffoldPath: {
        demandOption: false,
        default: getDefaultArgs().templateScaffoldPath,
    },
};
