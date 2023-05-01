import Handlebars, { HelperOptions } from "handlebars";

export const registerSurroundWithCurlyBraces = (
    handlebars: typeof Handlebars
): void => {
    handlebars.registerHelper(
        "surroundWithCurlyBraces",
        function (textOrThis: any, options: HelperOptions) {
            if (typeof textOrThis === "string") {
                const result = `{${textOrThis}}`;
                return new Handlebars.SafeString(result);
            } else {
                const data = options.fn(textOrThis, options);
                const result = `{${data}}`;
                return result;
            }
        }
    );
};
