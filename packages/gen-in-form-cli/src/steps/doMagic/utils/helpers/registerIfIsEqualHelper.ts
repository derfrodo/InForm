import Handlebars, { HelperOptions } from "handlebars";

export const registerIfIsEqualHelper = (
    handlebars: typeof Handlebars
): void => {
    handlebars.registerHelper(
        "ifIsEqual",
        function (this: any, arg1, arg2, options: HelperOptions) {
            // const result = options.fn(registerEntry.context, {
            //     ...options,
            // });

            if (arg1 === arg2) {
                return options.fn(this, options);
            }
            return options.inverse ? options.inverse(this, options) : null;
        }
    );
};
