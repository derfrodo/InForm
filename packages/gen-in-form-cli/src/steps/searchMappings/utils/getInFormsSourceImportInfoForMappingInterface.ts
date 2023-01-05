import { InFormRuntimeModuleName } from "@src/common/constants";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { InFormsSourceImportInfo } from "@src/common/types/InFormsSourceImportInfo";
import { isModule } from "@src/common/utils/isModule";
import { getInFormsSourceImportInfoForInFormInterfacesOfTypeData } from "@src/common/utils/resolveInterfacesOfType/helpers/getInFormsSourceImportInfoForInFormInterfacesOfTypeData";
import { getTypeInFormsImportInfo } from "../../../common/utils/getTypeInFormsImportInfo";
import { InFormMappingInterfaceName } from "../constants";

/**
 * returns the InFormsSourceImportInfo for the mapping interface of informs generator if there is any
 * @param context
 * @returns {InFormsSourceImportInfo}
 */
export function getInFormsSourceImportInfoForMappingInterface(
    context: InFormSourceFile
): InFormsSourceImportInfo | null {
    return getInFormsSourceImportInfoForInFormInterfacesOfTypeData(context, {
        baseInterfaceName: InFormMappingInterfaceName,
        moduleName: InFormRuntimeModuleName,
    });
    const candidate = getTypeInFormsImportInfo(
        context,
        InFormMappingInterfaceName
    );
    if (isModule(candidate, InFormRuntimeModuleName)) {
        return candidate;
    }
    return null;
}
