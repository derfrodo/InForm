import ts from "typescript";
import { getTypeName } from "./getTypeName";
import { AdditionalTypeInfo } from "../types/AdditionalTypeInfo";
import { getTypeImportRelativePathToSourceFile } from "./getTypeImportRelativePathToSourceFile";

/**
 * Create Info for types like Validation / Restriction objects
 * @param type
 */

export function createAdditionalTypeInfoRelativToNode(
    type: ts.TypeNode | null,
    importRelativeTo: ts.Node
): AdditionalTypeInfo | null {
    if (!type) {
        return null;
    }
    const importPath = getTypeImportRelativePathToSourceFile(
        type,
        importRelativeTo.getSourceFile()
    );

    const result: AdditionalTypeInfo = {
        isImported: importPath !== null,
        importPath,
        isTypeOf: false,
        typeName: getTypeName(type),
    };

    return result;
}
