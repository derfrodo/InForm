import Handlebars, { HelperOptions } from "handlebars";


export function registerIfEndsWith(handlebars: typeof Handlebars): void {
    handlebars.registerHelper(
        "ifEndsWith",
        function (this: any, arg1: string, arg2, options: HelperOptions) {
            if (typeof arg1 === "string" && arg1.endsWith(arg2)) {
                return options.fn(this, options);
            }
            return options.inverse ? options.inverse(this, options) : null;
        }
    );
}
