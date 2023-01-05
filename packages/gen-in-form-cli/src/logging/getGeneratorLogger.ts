import { store } from "@src/globalState";
import { getLogger, Logger, LogLevelDesc, setDefaultLevel } from "loglevel";

export const fallbackLoggerSymbol = Symbol();
export const getFallbackLoggerSymbol = (): symbol => Symbol();

export function setGeneratorLoggerDefaultLevel(
    loglevel: LogLevelDesc | null = null
): void {
    if (loglevel !== null) {
        setDefaultLevel(loglevel);
    }
}

export function setGeneratorLoggerLevel(
    name: string | symbol,
    loglevel: LogLevelDesc | null = null
): void {
    const level = loglevel ?? store.getState().common.cliArgs?.loglevel;

    const logger = getLogger(name);
    logger.setLevel(level ?? "INFO");
}

export const getGeneratorLogger = (
    name: string | symbol = fallbackLoggerSymbol
): Logger => {
    const logger = getLogger(name);

    if (!store.getState().common.cliArgs) {
        logger.warn(
            "Logger initialized before cli args have been stored to global state."
        );
    }
    return logger;
};
