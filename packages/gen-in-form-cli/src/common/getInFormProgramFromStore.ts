import { store } from "@src/globalState";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { InFormTypescriptProgram } from "@src/common/types/InFormTypescriptProgram";

const GENERIC_ERROR_MSG =
    "No programm (InFormTypescriptProgram) have been resolved from store. This is mandatory before going on. Please update store before calling this method.";

export function getInFormProgramFromStore(): InFormTypescriptProgram;
export function getInFormProgramFromStore(
    errorMessage?: string,
    throwOnMissingArguments?: true
): InFormTypescriptProgram;
export function getInFormProgramFromStore(
    errorMessage: string,
    throwOnMissingArguments: false
): InFormTypescriptProgram | null;
export function getInFormProgramFromStore(
    throwOnMissingArguments: boolean
): InFormTypescriptProgram | null;

export function getInFormProgramFromStore(
    errorMessageOrThrow: string | boolean = GENERIC_ERROR_MSG,
    throwOnMissingArguments = true
): InFormTypescriptProgram | null {
    const throwOnMissing =
        typeof errorMessageOrThrow === "boolean"
            ? errorMessageOrThrow
            : throwOnMissingArguments;

    const argv = store.getState().common.programm;
    const log = getGeneratorLogger();
    if (!argv) {
        const msg =
            typeof errorMessageOrThrow === "string"
                ? errorMessageOrThrow
                : GENERIC_ERROR_MSG;
        const stack = new Error().stack;
        log.error(msg, stack);
        if (throwOnMissing) {
            throw new Error(msg);
        }
    }
    return argv;
}
