import { getDeclarationForType } from "@src/common/utils/getDeclarationForType";
import { debugTypescriptNode } from "@src/common/utils/logTypescriptNode";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { getSingleNonNullUniontypeInfo } from "../../../../common/utils/getSingleNonNullUniontypeInfo";
import { getSyntaxKindString } from "./getSyntaxKindString";
import { TypeForIndexedAccessTypeInfo } from "../../types/TypeForIndexedAccessTypeInfo";

export function resolveTypeForIndexedAccessType(
    t: ts.IndexedAccessTypeNode
): TypeForIndexedAccessTypeInfo {
    const log = getGeneratorLogger();
    const i = t.indexType;
    const dect = getDeclarationForType(t);

    if (ts.isLiteralTypeNode(i)) {
        const lit = i.literal;
        if (ts.isLiteralExpression(lit)) {
            const matchingProperty =
                dect?.properties?.find((p) => {
                    return p.name === lit.text;
                }) ?? null;

            if (matchingProperty) {
                const vd = matchingProperty.valueDeclaration;
                if (vd && ts.isPropertySignature(vd)) {
                    const questionToken = vd.questionToken;
                    const dectype = vd.type;
                    if (dectype && ts.isUnionTypeNode(dectype)) {
                        const typeinfo = getSingleNonNullUniontypeInfo(dectype);
                        return { ...typeinfo, optional: !!questionToken };
                    } else if (dectype && ts.isTypeLiteralNode(dectype)) {
                        return {
                            type: dectype,
                            nullable: false,
                            optional: !!questionToken,
                        };
                    } else {
                        const msg = `Declaration type is expected to be typeliteral or union type but is ${getSyntaxKindString(
                            dectype
                        )} => ${lit.text} ${getSyntaxKindString(
                            lit
                        )} as literal (${lit.kind}) (${t.getText()})`;
                        log.error(msg);
                        throw new Error(msg);
                    }
                } else {
                    const msg = `Only property signatures are allowed as of now for property matching of indexed properties but got ${getSyntaxKindString(
                        vd
                    )} => ${lit.text} ${getSyntaxKindString(lit)} as literal (${
                        lit.kind
                    }) (${t.getText()})`;
                    log.error(msg);
                    throw new Error(msg);
                }
            } else {
                const msg = `No matches have been found for literal index ${
                    lit.text
                } ${getSyntaxKindString(lit)} as literal (${
                    lit.kind
                }) (${t.getText()})`;
                log.error(msg);
                throw new Error(msg);
            }
        } else {
            const msg = `Detail type using indexed access types must be used with STRING literals but containts ${getSyntaxKindString(
                lit
            )} as literal (${lit.kind}) (${lit.getText()})`;
            log.error(msg);
            throw new Error(msg);
        }
    } else {
        const msg = `Type using indexed access types must be used with STRING literals ${getSyntaxKindString(
            t
        )}(${t.kind}) (${t.getText()})`;
        log.error(msg);
        debugTypescriptNode(t, null);
        throw new Error(msg);
    }
}
