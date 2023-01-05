import { CliArgs } from "./CliArgs";

export type CliArgsValues = CliArgs & {
    _: string[];
    [key: string]: string | string[];
};
