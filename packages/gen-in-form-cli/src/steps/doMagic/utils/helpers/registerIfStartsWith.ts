import Handlebars, { HelperOptions } from "handlebars";

export const registerIfStartsWith = (handlebars: typeof Handlebars): void => {
    handlebars.registerHelper(
        "ifStartsWith",
        function (this: any, arg1: string, arg2, options: HelperOptions) {
            if (typeof arg1 === "string" && arg1.startsWith(arg2)) {
                return options.fn(this, options);
            }
            return options.inverse ? options.inverse(this, options) : null;
        }
    );
};
