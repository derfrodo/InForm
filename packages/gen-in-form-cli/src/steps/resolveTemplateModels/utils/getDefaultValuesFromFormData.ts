import { getDeclarationForType } from "@src/common/utils/getDeclarationForType";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import { getMappedSymbolInfo } from "@src/steps/createFormModells/utils/getMappedSymbolInfo";
import ts from "typescript";
import { FormModell } from "../../createFormModells/types/FormModell";
import { InFormTemplateDefaultValuesMap } from "../types/InFormTemplateFormModel";
import { getDefaultValueForMappedSymbolInfo } from "./getMappedByTemplateModel";

export function getDefaultValuesFromFormData(
    model: FormModell
): InFormTemplateDefaultValuesMap {
    const log = getGeneratorLogger();
    const defaultValues: InFormTemplateDefaultValuesMap = {};

    if (model.data.defaultValuesType) {
        const defaultValuesType = model.data.defaultValuesType;

        if (ts.isTypeLiteralNode(defaultValuesType)) {
            for (const member of defaultValuesType.members) {
                if (ts.isPropertySignature(member) && member.type) {
                    const i = getMappedSymbolInfo(member.type ?? null);
                    const dv = getDefaultValueForMappedSymbolInfo(i);
                    defaultValues[member.name.getText()] = {
                        defaultValueModel: "defaultValueModel",
                        name: member.name.getText(),
                        ...dv,
                    };
                } else {
                    throw logAndError(
                        "Failed to resolve type for member as default value.",
                        { member: member }
                    );
                }
            }
            log.debug("Default values resolved", { defaultValues });
        } else if (ts.isTypeReferenceNode(defaultValuesType)) {
            const d = getDeclarationForType(defaultValuesType);
            const info = getMappedSymbolInfo(defaultValuesType);
            for (const member of d?.properties || []) {
                if (
                    member.valueDeclaration &&
                    ts.isPropertySignature(member.valueDeclaration) &&
                    member.valueDeclaration.type
                ) {
                    const i = getMappedSymbolInfo(
                        member.valueDeclaration.type ?? null
                    );
                    const dv = getDefaultValueForMappedSymbolInfo(i);
                    defaultValues[member.getName()] = {
                        defaultValueModel: "defaultValueModel",
                        name: member.getName(),
                        ...dv,
                    };
                } else {
                    throw logAndError(
                        "Failed to resolve type for member as default value.",
                        { member: member }
                    );
                }
            }
            log.debug("Default values resolved", { info });
        } else {
            log.warn(
                "Failed to resolve default values. Please use indexed types for now (see demo webapp)"
            );
        }
    } else {
        log.info(
            `No default values were resolved for model ${model.data.mappingInterfaceName}`
        );
    }
    // const defaultValues: InFormTemplateDefaultValuesMap = {};
    return defaultValues;
}
