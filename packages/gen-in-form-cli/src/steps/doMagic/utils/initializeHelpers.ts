import handlebars from "handlebars";
import { registerIfIsEqualHelper } from "./helpers/registerIfIsEqualHelper";
import { registerIfStartsWith } from "./helpers/registerIfStartsWith";
import { registerSwitchByHelper } from "./helpers/registerSwitchByHelper";
import { registerToPropertyName } from "./helpers/registerToPropertyName";
import { registerToPropertyValue } from "./helpers/registerToPropertyValue";
import { registerSurroundWithCurlyBraces } from "./helpers/registerSurroundWithCurlyBraces";
import { registerIfEndsWith } from "./helpers/registerIfEndsWith";
import { registerFindElementByPropertyValueAndRegex } from "./helpers/registerFindElementByPropertyValueAndRegex";

export async function initializeHelpers(): Promise<void> {
    handlebars.registerHelper("json", function (context) {
        return JSON.stringify(context);
    });
    registerToPropertyName(handlebars);
    registerToPropertyValue(handlebars);
    registerIfStartsWith(handlebars);
    registerIfEndsWith(handlebars);
    registerIfIsEqualHelper(handlebars);
    registerSwitchByHelper(handlebars);
    registerSurroundWithCurlyBraces(handlebars);

    registerFindElementByPropertyValueAndRegex(handlebars);
}
