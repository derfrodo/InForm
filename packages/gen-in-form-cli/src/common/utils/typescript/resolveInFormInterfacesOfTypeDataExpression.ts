import { InFormRuntimeModuleName } from "@src/common/constants";
import { logAndError } from "@src/logging/logAndThrow";
import ts from "typescript";
import { InFormInterfacesOfTypeDataExpression } from "@src/common/utils/resolveInterfacesOfType/types/InFormInterfacesOfTypeDataExpression";
import { findInFormInterfacesOfTypeDataExpression } from "./findInFormInterfacesOfTypeDataExpression";

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
export async function resolveInFormInterfacesOfTypeDataExpression<
    TInterface extends string
>(
    mappingSymbolFromGeneralSettings: ts.Symbol,
    interfaceName: TInterface,
    moduleName = InFormRuntimeModuleName,
    filename?: string
): Promise<InFormInterfacesOfTypeDataExpression<TInterface>> {
    const vt = await findInFormInterfacesOfTypeDataExpression(
        mappingSymbolFromGeneralSettings,
        interfaceName,
        moduleName,
        filename
    );

    if (!vt) {
        const msg = `Expected to get interface ${interfaceName} for symbol ${
            mappingSymbolFromGeneralSettings.name
        } from ${moduleName} but got ${mappingSymbolFromGeneralSettings.valueDeclaration?.getText()}`;
        throw logAndError(msg, {
            mappingSymbolName: mappingSymbolFromGeneralSettings.name,
        });
    }
    return vt;
}
