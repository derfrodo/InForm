import ts from "typescript";
import { getTypeChecker } from "./getTypeChecker";

export function getNodeSymbol(
    node: ts.Node | null | undefined,
    checker?: ts.TypeChecker
): ts.Symbol | null {
    checker = checker ?? getTypeChecker();
    if (node) {
        const typeSymbol = checker.getSymbolAtLocation(node);

        return typeSymbol ?? null;
    } else {
        // Todo logging?
    }
    return null;
}
