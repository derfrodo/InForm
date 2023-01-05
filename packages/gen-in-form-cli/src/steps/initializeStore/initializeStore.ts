import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { commonActionCreators } from "@src/common/redux";
import { CliArgsValues } from "@src/common/types/CliArgsValues";
import { createInFormTypescriptProgram } from "@src/common/utils/createInFormProgram";
import { store } from "@src/globalState";
import {
    getFallbackLoggerSymbol,
    getGeneratorLogger,
    setGeneratorLoggerDefaultLevel,
    setGeneratorLoggerLevel,
} from "@src/logging/getGeneratorLogger";

export const initializeStore = async (
    argv: CliArgsValues,
    fsHelper: FileSystemHelper = new FileSystemHelper()
): Promise<void> => {
    setGeneratorLoggerDefaultLevel(argv.loglevel);
    setGeneratorLoggerLevel(getFallbackLoggerSymbol(), argv.loglevel);
    const log = getGeneratorLogger(getFallbackLoggerSymbol());
    log.info("Welcome to Gen-In-Forms!");

    // log.trace("Trace");
    // log.debug("Debug");
    // log.info("Info");
    // log.warn("Warn");
    // log.error("Error");

    log.info("Initializing Store for InForm.");
    store.dispatch(commonActionCreators.setCliArgs(argv));

    const program = await createInFormTypescriptProgram(argv, fsHelper);
    store.dispatch(commonActionCreators.setProgramm(program));
};
