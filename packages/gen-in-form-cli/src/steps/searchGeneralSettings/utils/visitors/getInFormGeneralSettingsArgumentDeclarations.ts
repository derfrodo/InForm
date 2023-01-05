import { getDeclarationForType } from "@src/common/utils/getDeclarationForType";
import { getNodeSymbol } from "@src/common/utils/getNodeSymbol";
import ts from "typescript";
import { InFormGeneralSettingsArgumentDeclarations } from "../../types/InFormGeneralSettingsArgumentDeclarations";
import { InFormGeneralSettingsExpression } from "../../types/InFormGeneralSettingsExpression";

export function getInFormGeneralSettingsArgumentDeclarations(
    settingsExpression: InFormGeneralSettingsExpression
): InFormGeneralSettingsArgumentDeclarations {
    // TypeLiteral = 182,
    const propertyArg = settingsExpression.typeArguments?.at(0);
    const propertyNameType =
        propertyArg &&
        (ts.isTypeReferenceNode(propertyArg) ||
            ts.isTypeLiteralNode(propertyArg)) &&
        getDeclarationForType(propertyArg);

    const propertyNamesTypeSymbol =
        propertyArg &&
        (ts.isTypeReferenceNode(propertyArg)
            ? getNodeSymbol(propertyArg.typeName)
            : getNodeSymbol(propertyArg));
    const vd = propertyNamesTypeSymbol?.valueDeclaration;
    const propertyNamesEnum = vd && ts.isEnumDeclaration(vd) ? vd : null;

    // TypeReference = 178
    const mappingArg = settingsExpression.typeArguments?.at(0);
    const mappingType =
        mappingArg &&
        ts.isTypeReferenceNode(mappingArg) &&
        getDeclarationForType(mappingArg);

    const additionalArg =
        (settingsExpression.typeArguments?.length ?? 0) > 1
            ? settingsExpression.typeArguments?.at(1)
            : null;

    const additionalType = !additionalArg
        ? undefined
        : ts.isTypeLiteralNode(additionalArg)
        ? getDeclarationForType(additionalArg)
        : null;

    if (mappingType && propertyNameType && additionalType !== null) {
        const result: InFormGeneralSettingsArgumentDeclarations = {
            propertyNameType: {
                ...propertyNameType,
                enumeration: propertyNamesEnum,
            },
            mappingType,
            additionalType: additionalType,
        };
        return result;
    }

    throw new Error(
        "Not all parameters of general Settings has been resolved. Make sure, that you define general settings according to example."
    );
}

// // TypeLiteral = 182,
// const mappingKeyType = generalSettingsNode.typeArguments?.at(0);

// // TypeReference = 178
// const mappingType = generalSettingsNode.typeArguments?.at(1);

// if (mappingType && ts.isTypeReferenceNode(mappingType)) {
//     const dec = getDeclarationForType(mappingType);
//     const declaration = dec?.declaration;
//     const ps = dec?.properties;
//     const fProp = ps?.at(0);
//     const n = fProp?.getName();

//     const f = ps?.at(0)?.declarations?.at(0);
//     if (f && ts.isPropertySignature(f)) {
//         const name = f.name;
//         if (name && ts.isComputedPropertyName(name)) {
//             const e = name.expression;
//             if (e && ts.isPropertyAccessExpression(e)) {
//                 console.log(e.name);
//             }
//         }
//     }
//     console.log(dec);
// }

// const additionalType = generalSettingsNode.typeArguments?.at(2);
