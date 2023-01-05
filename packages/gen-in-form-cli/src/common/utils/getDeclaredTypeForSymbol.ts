import ts from "typescript";
import { getTypeChecker } from "./getTypeChecker";

export function getDeclaredTypeForSymbol(
    type: ts.Symbol,
    checker?: ts.TypeChecker
): ts.Type | null {
    checker = checker ?? getTypeChecker();
    const typeDeclaration = type ? checker.getDeclaredTypeOfSymbol(type) : null;
    return typeDeclaration;
}
