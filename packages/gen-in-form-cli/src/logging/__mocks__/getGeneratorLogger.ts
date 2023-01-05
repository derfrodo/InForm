import { getLogger, Logger } from "loglevel";
import type {
    getGeneratorLogger as origFn,
    setGeneratorLoggerDefaultLevel as setGeneratorLoggerDefaultLevelOrig,
    setGeneratorLoggerLevel as setGeneratorLoggerLevelOrig,
} from "../getGeneratorLogger";

export const fallbackLoggerSymbol = Symbol();
export const getFallbackLoggerSymbol = (): symbol => Symbol();

const registry: { [key in string | symbol]?: Logger } = {};

export const getGeneratorLogger: typeof origFn = (
    name: string | symbol = fallbackLoggerSymbol
) => {
    if (!registry[name]) {
        const logger = getLogger(name);
        logger.setLevel("SILENT");
        logger.info = jest.fn();
        logger.debug = jest.fn();
        registry[name] = logger;
        return logger;
    } else {
        const logger = registry[name];
        if (!logger) {
            throw new Error("No logger registered!?");
        }
        return logger;
    }
};

export const setGeneratorLoggerDefaultLevel: typeof setGeneratorLoggerDefaultLevelOrig =
    jest.fn();

export const setGeneratorLoggerLevel: typeof setGeneratorLoggerLevelOrig =
    jest.fn();
