import { Logger } from "loglevel";
import { getGeneratorLogger } from "./getGeneratorLogger";

/**
 * Logs as error and returns error with first argument as error message. Uses default generator logger
 * If you want to pass a logger, please use @see {@link loggerAndError}
 */
export function logAndError(errorMessage: string, ...msg: any[]): Error {
    const log = getGeneratorLogger();

    log.error(errorMessage, msg);
    return new Error(errorMessage);
}

export function loggerAndError(
    log: Logger,
    errorMessage: string,
    ...msg: any[]
): Error;
export function loggerAndError(
    log: string,
    errorMessage: string,
    ...msg: any[]
): Error;

export function loggerAndError(
    log: Logger | string,
    errorMessage: string,
    ...msg: any[]
): Error {
    const logger = typeof log === "string" ? getGeneratorLogger(log) : log;

    logger.error(errorMessage, msg);
    return new Error(errorMessage);
}

/**
 * Logs as error and throws first argument as error message. Uses default generator logger
 * If you want to pass a logger, please use @see {@link loggerErrorAndThrow}
 */
export function logAndThrow(errorMessage: string, ...msg: any[]): void {
    const log = getGeneratorLogger();

    log.error(errorMessage, msg);
    throw new Error(errorMessage);
}

export function loggerErrorAndThrow(
    log: Logger,
    errorMessage: string,
    ...msg: any[]
): void;
export function loggerErrorAndThrow(
    log: string,
    errorMessage: string,
    ...msg: any[]
): void;

export function loggerErrorAndThrow(
    log: Logger | string,
    errorMessage: string,
    ...msg: any[]
): void {
    const logger = typeof log === "string" ? getGeneratorLogger(log) : log;

    logger.error(errorMessage, msg);
    throw new Error(errorMessage);
}
