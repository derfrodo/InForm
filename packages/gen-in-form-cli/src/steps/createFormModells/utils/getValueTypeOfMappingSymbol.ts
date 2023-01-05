import ts from "typescript";

export function getValueTypeOfMappingSymbol(
    mappingSymbol: ts.Symbol
): ts.TypeNode | null {
    const valueDeclaration = mappingSymbol.valueDeclaration;
    const vt =
        valueDeclaration && ts.isPropertySignature(valueDeclaration)
            ? valueDeclaration.type ?? null
            : null;

    return vt;
}
