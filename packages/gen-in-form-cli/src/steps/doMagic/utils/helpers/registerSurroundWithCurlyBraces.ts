import Handlebars from "handlebars";

export const registerSurroundWithCurlyBraces = (
    handlebars: typeof Handlebars
): void => {
    handlebars.registerHelper("surroundWithCurlyBraces", function (text) {
        const result = `{${text}}`;
        return new Handlebars.SafeString(result);
    });
};
