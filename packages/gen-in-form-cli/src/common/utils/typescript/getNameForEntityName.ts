import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";

export function getNameForEntityName(expName: ts.EntityName): string | null {
    const log = getGeneratorLogger();

    if (ts.isIdentifier(expName)) {
        return expName.text; //.escapedText + "";
    }
    log.error("No name has been resolved for EntityName.", {
        type: ts.SyntaxKind[expName.kind],
    });
    return null;
}
