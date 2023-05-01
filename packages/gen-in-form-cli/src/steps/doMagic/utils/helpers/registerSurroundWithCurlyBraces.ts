import Handlebars, { HelperOptions } from "handlebars";

export const registerSurroundWithCurlyBraces = (
    handlebars: typeof Handlebars
): void => {
    handlebars.registerHelper(
        "surroundWithCurlyBraces",
        function (
            this: any,
            textOrOptions: string | undefined | HelperOptions
        ) {
            if (typeof textOrOptions === "string") {
                const result = `{${textOrOptions}}`;
                return new Handlebars.SafeString(result);
            } else if (textOrOptions) {
                const data = textOrOptions.fn(this, textOrOptions);
                const result = `{${data}}`;
                return result;
            } else {
                throw new Error(
                    "Wrong usage of helper surroundWithCurlyBraces. Please review unittests for clarification."
                );
            }
        }
    );
};
