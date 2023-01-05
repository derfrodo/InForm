import ts from "typescript";
import { getInFormProgramFromStore } from "../getInFormProgramFromStore";

export function getTypeOfNode(
    node: ts.Node | null | undefined
): ts.Type | null | undefined {
    const program = getInFormProgramFromStore();

    const checker = program.program.getTypeChecker();
    if (node) {
        const typeSymbol = checker.getSymbolAtLocation(node);

        if (typeSymbol) {
            return checker.getTypeOfSymbolAtLocation(typeSymbol, node);
        } else {
            // Todo logging?
        }
    } else {
        // Todo logging?
    }
    return null;
}
