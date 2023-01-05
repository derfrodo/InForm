import { store } from "@src/globalState";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { CliArgs } from "@src/common/types/CliArgs";

const GENERIC_ERROR_MSG =
    "No cli arguments have been resolved from store. This is mandatory before going on. Please update store before calling this method.";

export function getCliArgumentsFromStore(): CliArgs;
export function getCliArgumentsFromStore(
    errorMessage?: string,
    throwOnMissingArguments?: true
): CliArgs;
export function getCliArgumentsFromStore(
    errorMessage: string,
    throwOnMissingArguments: false
): CliArgs | null;
export function getCliArgumentsFromStore(
    throwOnMissingArguments: boolean
): CliArgs | null;

export function getCliArgumentsFromStore(
    errorMessageOrThrow: string | boolean = GENERIC_ERROR_MSG,
    throwOnMissingArguments = true
): CliArgs | null {
    const throwOnMissing =
        typeof errorMessageOrThrow === "boolean"
            ? errorMessageOrThrow
            : throwOnMissingArguments;

    const argv = store.getState().common.cliArgs;
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
