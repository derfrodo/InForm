import ts from "typescript";
import { getSourceFileFromSymbol } from "./getSourceFileFromSymbol";

export function getSourceFileFromDeclaredType(
    typeDeclaration?: ts.Type | null
): ts.SourceFile | null {
    return getSourceFileFromSymbol(typeDeclaration?.getSymbol());
}
