import {
    InFormOrderingTypePropertyName,
    InFormOrderTypeName,
    InFormRuntimeModuleName,
} from "@src/common/constants";
import { getNodeSymbol } from "@src/common/utils/getNodeSymbol";
import { getOrCreateInFormsSourceFile } from "@src/common/utils/getOrCreateInFormsSourceFile";
import { isInFormInterfacesOfTypeDataExpression } from "@src/common/utils/resolveInterfacesOfType/helpers/isInFormInterfacesOfTypeDataExpression";
import { findMemberFromInterface } from "@src/common/utils/typescript/findMemberFromInterface";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import type { FormMappingOrderingTypeInfo } from "../../types/FormMappingOrderingTypeInfo";
import type { InFormMappingExpression } from "../../types/InFormMappingExpression";
import { getIndexedAccessNodeInfo } from "./getIndexedAccessNodeInfo";

export async function getOrderingTypeFromInFormMapping(
    node: InFormMappingExpression,
    doc: ts.SourceFile
): Promise<FormMappingOrderingTypeInfo | null> {
    const log = getGeneratorLogger();

    const interfaceNode = node.parent ? node.parent.parent : null;

    if (interfaceNode && ts.isInterfaceDeclaration(interfaceNode)) {
        const orderNTry = findMemberFromInterface(
            interfaceNode,
            InFormOrderingTypePropertyName
        );
        if (orderNTry?.type && ts.isTypeQueryNode(orderNTry.type)) {
            const typeSymbol = getNodeSymbol(orderNTry.type.exprName);
            const dec = typeSymbol?.declarations?.at(0);

            if (
                dec &&
                ts.isVariableDeclaration(dec) &&
                dec.initializer &&
                ts.isObjectLiteralExpression(dec.initializer)
            ) {
                return {
                    type: null,
                    expression: dec.initializer,
                    nullable: false,
                    optional: false,
                };
            }
            console.log(dec);
        }
        const orderType = findMemberFromInterface(
            interfaceNode,
            InFormOrderingTypePropertyName
        );
        const sf = await getOrCreateInFormsSourceFile(doc.fileName);
        const type = orderType?.type;
        if (
            type &&
            isInFormInterfacesOfTypeDataExpression(type, sf, {
                baseInterfaceName: InFormOrderTypeName,
                moduleName: InFormRuntimeModuleName,
            })
        ) {
            const firstTypeArgument = type.typeArguments?.at(0);
            if (
                firstTypeArgument &&
                (ts.isIntersectionTypeNode(firstTypeArgument) ||
                    ts.isIndexedAccessTypeNode(firstTypeArgument))
            ) {
                return getIndexedAccessNodeInfo(firstTypeArgument);
            } else {
                log.warn(
                    "Order type found for mapping, but not as indexed access type intersected with {}",
                    { orderType: orderType.getText() }
                );
                return null;
            }
        } else {
            log.warn("Order type might be empty?", {
                orderType: orderType?.getText(),
            });
            return null;
        }
    } else {
        log.warn(
            "Failed to evaluate mappings, it must be an interface as of now unfortunatelly to use the order type"
        );
        return null;
    }
}
