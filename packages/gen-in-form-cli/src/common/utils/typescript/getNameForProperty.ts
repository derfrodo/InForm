import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";

export function getNameForProperty(
    propertyName: ts.PropertyName,
    oldWay = true
): string | null {
    const log = getGeneratorLogger();
    if (ts.isIdentifier(propertyName)) {
        return oldWay ? propertyName.getText() : propertyName.text; //.escapedText + "";
        // return propertyName.getText(); //.escapedText + "";
    }
    if(ts.isStringLiteral(propertyName)) {
        return propertyName.text;
    }
    log.error("No name has been resolved for propertyName.", {
        type: ts.SyntaxKind[propertyName.kind],
    });
    return null;
}
