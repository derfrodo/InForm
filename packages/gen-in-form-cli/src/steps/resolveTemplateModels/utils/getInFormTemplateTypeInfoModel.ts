import { AllowedNames } from "@src/common/types/AllowedNames";
import { DeclarationForType } from "@src/common/types/DeclarationForType";
import { InFormsSourceImportInfo } from "@src/common/types/InFormsSourceImportInfo";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { FormMappingData } from "@src/steps/searchMappings/types/FormMappingData";
import ts from "typescript";
import { FormModell } from "../../createFormModells/types/FormModell";
import { InFormTemplateTypeInfoModel } from "../types/InFormTemplateTypeInfoModel";

export type DeclarationForTypeKeys = AllowedNames<
    FormMappingData,
    DeclarationForType | null
>;

export function getInFormTemplateTypeInfoModel(
    model: FormModell,
    typeKey: DeclarationForTypeKeys
): InFormTemplateTypeInfoModel | null {
    const log = getGeneratorLogger();

    const typeDeclaration = model.data[typeKey];
    const symbolOfImportedType: ts.Symbol | null | undefined =
        typeDeclaration?.symbol;

    if (!symbolOfImportedType) {
        log.info(
            "No type symbol has been resolved. There will be no type info"
        );
        return null;
    }

    let matchingBinding: ts.ImportSpecifier | null = null;
    let clause: InFormsSourceImportInfo | null = null;
    for (const i of model.data.sourceFile.imports.imports) {
        const namedBindings = i.declaration.importClause?.namedBindings;

        if (namedBindings && ts.isNamedImports(namedBindings)) {
            for (const e of namedBindings.elements) {
                if (e.name.escapedText === symbolOfImportedType?.escapedName) {
                    matchingBinding = e;
                    clause = i;
                } else {
                    log.debug(
                        "Named import is not import",
                        e.name.escapedText,
                        symbolOfImportedType?.escapedName
                    );
                }
            }
        }
    }
    if (clause) {
        return {
            text: typeDeclaration?.baseTypeNode?.getText() ?? null,
            file: clause.fileReference?.fileName,
            typeName: symbolOfImportedType?.escapedName,
            namedBinding: matchingBinding?.propertyName?.escapedText
                ? `${matchingBinding?.propertyName?.escapedText} as ${matchingBinding?.name.escapedText}`
                : matchingBinding?.name.escapedText,
        };
    } else {
        return null;
    }
}
