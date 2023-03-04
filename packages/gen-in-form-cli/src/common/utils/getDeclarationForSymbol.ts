import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { DeclarationForType } from "../types/DeclarationForType";
import { getDeclaredTypeForSymbol } from "./getDeclaredTypeForSymbol";
import { getSourceFileFromDeclaredType } from "./getSourceFileFromDeclaredType";
import { getTypeChecker } from "./getTypeChecker";

export function getDeclarationForSymbol(
    typeSymbol: ts.Symbol | null | undefined,
    baseTypeNode:
        | ts.EntityName
        | ts.TypeReferenceNode
        | ts.TypeLiteralNode
        | ts.Node
        | null
        | undefined,
    typeArgumentDeclarations?: (DeclarationForType | null)[] | null
): DeclarationForType | null {
    const log = getGeneratorLogger();
    if (!typeSymbol) {
        return null;
    }

    const checker = getTypeChecker();
    const typeDeclaration = getDeclaredTypeForSymbol(typeSymbol, checker);

    let members: ts.PropertySignature[] | null = null;
    if (typeDeclaration === null) {
        return null;
    } else if ((typeDeclaration as any).intrinsicName === "error") {
        const declarations = typeSymbol.declarations ?? [];
        const firstDeclaration =
            declarations.length === 1 ? declarations[0] : null;
        members =
            firstDeclaration && ts.isTypeLiteralNode(firstDeclaration)
                ? ([...firstDeclaration.members].filter((m) =>
                      ts.isPropertySignature(m)
                  ) as ts.PropertySignature[])
                : null;
        if (members === null) {
            const msg = `Literal type expected. no members found. Did you use an external type? This must fail for ${typeSymbol.escapedName} :( - you might also want to check if you are using aliases, which aren't supported at the moment`;
            log.error(msg);
            throw new Error(msg);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let outerTypeSymbol: any = null;

    outerTypeSymbol = typeSymbol;

    const properties = typeDeclaration
        ? checker.getPropertiesOfType(typeDeclaration)
        : null;

    const sourceFile = getSourceFileFromDeclaredType(typeDeclaration);

    const result: DeclarationForType = {
        declaration: typeDeclaration,
        properties: properties,
        members,
        symbol: typeSymbol,
        sourceFile,
        baseTypeNode,
        typeArgumentDeclarations: typeArgumentDeclarations,
    };
    return result;
}
