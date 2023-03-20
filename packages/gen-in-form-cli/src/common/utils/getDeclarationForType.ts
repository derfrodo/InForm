import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { DeclarationForType } from "../types/DeclarationForType";
import { getDeclarationForSymbol } from "./getDeclarationForSymbol";
import { getNodeSymbol } from "./getNodeSymbol";

function isEntityNameNode(
    node: ts.Node | null | undefined
): node is ts.EntityName {
    return !!node && (ts.isIdentifier(node) || ts.isQualifiedName(node));
}

export function getDeclarationForType(
    node:
        | ts.EntityName
        | ts.TypeReferenceNode
        | ts.LiteralTypeNode
        | ts.Node
        | null
        | undefined,
    originalTypeNode?:
        | ts.EntityName
        | ts.TypeReferenceNode
        | ts.LiteralTypeNode
        | ts.Node
        | null
        | undefined
): DeclarationForType | null {
    const log = getGeneratorLogger();
    let typeSymbol: ts.Symbol | null = getNodeSymbol(node);
    let typeArgumentDeclarations: (DeclarationForType | null)[] | null = null;

    if (node && ts.isTypeReferenceNode(node) ) {
        // Return type!?

    }

    if (node && ts.isTypeReferenceNode(node)) {
        typeSymbol = getNodeSymbol(node.typeName);
        if ((node.typeArguments?.length ?? 0) > 0) {
            const nodeText = node.getText();
            log.info("Resolving type arguments for type node", {
                node: nodeText,
            });
            // iterate through args...
            typeArgumentDeclarations = (node.typeArguments || [])?.map((t) =>
                getDeclarationForType(t)
            );
        }
    }

    if (node && ts.isRestTypeNode(node)) {
        typeSymbol = getNodeSymbol(node);
    }
    
    if (node && isEntityNameNode(node)) {
        typeSymbol = getNodeSymbol(node);
    }

    if (node && ts.isTypeLiteralNode(node)) {
        log.debug(`Found literal node ${node.getText()}.`);
        typeSymbol = getNodeSymbol(node) ?? (node as any).symbol;
    }

    if (node && ts.isLiteralTypeNode(node)) {
        typeSymbol = getNodeSymbol(node);
    }

    if (node && ts.isIndexedAccessTypeNode(node)) {
        return getDeclarationForType(node.objectType, node);
    }

    // const typeSymbol =
    //     node && ts.isTypeReferenceNode(node)
    //         ? getNodeSymbol(node.typeName)
    //         : node && ts.isLiteralTypeNode(node)
    //             ? getNodeSymbol(node)
    //             : getNodeSymbol(node);

    return getDeclarationForSymbol(
        typeSymbol,
        originalTypeNode ?? node,
        typeArgumentDeclarations
    );
}
