import Handlebars, { HelperDelegate, HelperOptions } from "handlebars";

export const registerFindElementByPropertyValueAndRegex = (
    handlebars: typeof Handlebars
): void => {
    handlebars.registerHelper("findElementByPropertyValueAndRegex", function <
        T extends {},
        TArray extends T[],
        TKey extends keyof T & string
    >(
        this: any,
        items: TArray,
        propertyToFilter: TKey,
        regex: string | RegExp,
        options: HelperOptions
    ) {
        const pattern = new RegExp(regex);

        const item = items.find((value) =>
            pattern.test(value[propertyToFilter] + "")
        );

        if (item) {
            return options.fn(item, options);
        }

        return null;
    } as HelperDelegate);
};
