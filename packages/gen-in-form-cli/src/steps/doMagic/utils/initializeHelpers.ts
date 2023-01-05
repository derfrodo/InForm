import handlebars from "handlebars";
import { registerIfIsEqualHelper } from "./helpers/registerIfIsEqualHelper";
import { registerIfStartsWith } from "./helpers/registerIfStartsWith";
import { registerSwitchByHelper } from "./helpers/registerSwitchByHelper";
import { registerToPropertyName } from "./helpers/registerToPropertyName";
import { registerToPropertyValue } from "./helpers/registerToPropertyValue";

export async function initializeHelpers(): Promise<void> {
    handlebars.registerHelper("json", function (context) {
        return JSON.stringify(context);
    });
    registerToPropertyName(handlebars);
    registerToPropertyValue(handlebars);
    registerIfStartsWith(handlebars);
    registerIfIsEqualHelper(handlebars);
    registerSwitchByHelper(handlebars);
}
