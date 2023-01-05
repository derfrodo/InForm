import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { InFormsSourceImportInfo } from "@src/common/types/InFormsSourceImportInfo";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { hasImportDeclarationNamedBinding } from "./typescript/hasImportDeclarationNamedBinding";

export function getTypeInFormsImportInfo(
    context: InFormSourceFile,
    nameOfType: string
): InFormsSourceImportInfo | null {
    const log = getGeneratorLogger();
    const { imports } = context;
    const matches = imports.imports.filter((i) =>
        hasImportDeclarationNamedBinding(i.declaration, nameOfType)
    );
    if (matches.length === 1) {
        return matches[0];
    }
    if (matches.length > 1) {
        log.warn(
            `Searching for import type with name ${nameOfType} returned multiple imports. Should never happen though!`,
            matches
        );
    }
    return null;
}
