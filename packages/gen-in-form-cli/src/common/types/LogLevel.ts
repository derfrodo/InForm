import type { LogLevelDesc } from "loglevel";


export type OriginalLogLevelDesc = LogLevelDesc;

/**
 * this is analoug to @see {LogLevelDesc}
 */
export type LogLevel =
    | "TRACE"
    | "DEBUG"
    | "INFO"
    | "WARN"
    | "ERROR"
    | "SILENT"
    | 'trace'
    | 'debug'
    | 'info'
    | 'warn'
    | 'error'
    | 'silent'
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5;