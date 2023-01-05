import { InFormsSourceImportInfo } from "@src/common/types/InFormsSourceImportInfo";
import ts from "typescript";

export function isModule(
    importInfo: InFormsSourceImportInfo | null,
    moduleName: string
): boolean {
    const moduleSpecifier = importInfo?.declaration.moduleSpecifier;

    if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier)) {
        return (
            moduleSpecifier.text === moduleName ||
            moduleSpecifier.text.startsWith(moduleName)
        );
    }
    return false;
}
