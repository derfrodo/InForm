import { logAndError } from "@src/logging/logAndThrow";
import Handlebars, { HelperOptions } from "handlebars";

export type SwitchRegistryEntry = {
    key: any;
    value: any;
    context: any;
    caseFound: boolean;
    hitDefault: boolean;
};

export const registerSwitchByHelper = (handlebars: typeof Handlebars): void => {
    const switchRegistry: SwitchRegistryEntry[] = [];

    // see also https://stackoverflow.com/questions/53398408/switch-case-with-default-in-handlebars-js
    handlebars.registerHelper("switchBy", function (options: HelperOptions) {
        // if (options?.data.isInSwitchByBlock) {
        //     throw logAndError(
        //         "Only one level of switch blocks are allowed at this time (might work already though...)",
        //         { hash: options.hash, data: options.data }
        //     );
        // }

        const registerEntry: SwitchRegistryEntry = {
            ...options.hash,
            caseFound: false,
            hitDefault: false,
        };
        switchRegistry.push(registerEntry);

        if (
            typeof registerEntry.value !== "string" &&
            typeof registerEntry.value !== "number" &&
            typeof registerEntry.value !== "boolean" &&
            typeof registerEntry.value !== "bigint" &&
            typeof registerEntry.value !== "undefined" &&
            registerEntry.value !== null
        ) {
            throw logAndError(
                "Failed to open switch in template: Type of value is not supported for switch statement.",
                { hash: options.hash, valueType: typeof registerEntry.value }
            );
        }

        const result = options.fn(registerEntry.context, {
            ...options,
            data: {
                ...options.data,
                SwitchByBlockEntry: registerEntry,
                isInSwitchByBlock: true,
            },
        });

        switchRegistry.splice(switchRegistry.indexOf(registerEntry, 1));
        return result;
    });

    handlebars.registerHelper(
        "case",
        function (value, options?: HelperOptions) {
            const registerEntry: SwitchRegistryEntry | undefined | null =
                options?.data.isInSwitchByBlock
                    ? options?.data.SwitchByBlockEntry
                    : null;
            if (!registerEntry || !options) {
                throw logAndError(
                    "Failed to evaluate case of switch in template: Context has not been registered or no options have been set.",
                    { hash: options?.hash, data: options?.data }
                );
            }

            if (
                registerEntry.value === value &&
                !registerEntry.caseFound &&
                !registerEntry.hitDefault
            ) {
                registerEntry.caseFound = true;
                return options.fn(registerEntry.context, options);
            }
        }
    );

    handlebars.registerHelper("default", function (options?: HelperOptions) {
        const registerEntry: SwitchRegistryEntry | undefined | null = options
            ?.data.isInSwitchByBlock
            ? options?.data.SwitchByBlockEntry
            : null;

        if (!registerEntry || !options) {
            throw logAndError(
                "Failed to evaluate case of switch in template: Context has not been registered or no options have been set.",
                { hash: options?.hash, data: options?.data }
            );
        }
        if (registerEntry.hitDefault) {
            throw logAndError("Duplicated default for switch block.", {
                hash: options?.hash,
                data: options?.data,
            });
        }
        if (!registerEntry.caseFound && !registerEntry.hitDefault) {
            registerEntry.hitDefault = true;
            return options.fn(registerEntry.context, options);
        }
    });
};
