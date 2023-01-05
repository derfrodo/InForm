import { InFormRuntimeModuleName } from "@src/common/constants";
import { getOrCreateInFormsSourceFile } from "@src/common/utils/getOrCreateInFormsSourceFile";
import { isInFormInterfacesOfTypeDataExpression } from "@src/common/utils/resolveInterfacesOfType/helpers/isInFormInterfacesOfTypeDataExpression";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndThrow } from "@src/logging/logAndThrow";
import ts from "typescript";
import { getValueTypeOfMappingSymbol } from "../../../steps/createFormModells/utils/getValueTypeOfMappingSymbol";
import { InFormInterfacesOfTypeDataExpression } from "@src/common/utils/resolveInterfacesOfType/types/InFormInterfacesOfTypeDataExpression";

/**
 * Returns InFormInterfacesOfTypeDataExpression if given symbol
 *  1. is Interface
 *  2. has correct Name
 *  3. comes from correct model
 * @param mappingSymbolFromGeneralSettings
 * @param filename where the symbol is located - will be tried to be resolved from symbols value declaration if not passed
 * @param interfaceName
 * @param moduleName
 * @returns
 */

export async function findInFormInterfacesOfTypeDataExpression<
    TInterface extends string
>(
    mappingSymbolFromGeneralSettings: ts.Symbol,
    interfaceName: TInterface,
    moduleName = InFormRuntimeModuleName,
    filename?: string
): Promise<InFormInterfacesOfTypeDataExpression<TInterface> | null> {
    const log = getGeneratorLogger();
    const vt = getValueTypeOfMappingSymbol(mappingSymbolFromGeneralSettings);
    const fn =
        filename ??
        mappingSymbolFromGeneralSettings.valueDeclaration?.getSourceFile()
            .fileName;
    if (!fn) {
        throw logAndThrow("No sourcefile for type mappings found", vt);
    }
    const file = await getOrCreateInFormsSourceFile(fn);

    if (
        !vt ||
        !isInFormInterfacesOfTypeDataExpression(vt, file, {
            baseInterfaceName: interfaceName,
            moduleName: moduleName,
        })
    ) {
        const msg = `Searched for interface ${interfaceName} for symbol ${
            mappingSymbolFromGeneralSettings.name
        } from ${moduleName} but got ${mappingSymbolFromGeneralSettings.valueDeclaration?.getText()}`;
        log.warn(msg, {
            mappingSymbolName: mappingSymbolFromGeneralSettings.name,
        });
        return null;
    }
    return vt;
}
