import { InFormRuntimeModuleName } from "@src/common/constants";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { InFormsSourceImportInfo } from "@src/common/types/InFormsSourceImportInfo";
import { isModule } from "@src/common/utils/isModule";
import { getTypeInFormsImportInfo } from "../../../common/utils/getTypeInFormsImportInfo";
import { InFormGeneralSettingsInterfaceName } from "../constants";

/**
 * returns the InFormsSourceImportInfo for the mapping interface of informs generator if there is any
 * @param context
 * @returns {InFormsSourceImportInfo}
 */
export function getInFormsSourceImportInfoForGeneralSettingsInterface(
    context: InFormSourceFile
): InFormsSourceImportInfo | null {
    const candidate = getTypeInFormsImportInfo(
        context,
        InFormGeneralSettingsInterfaceName
    );
    if (isModule(candidate, InFormRuntimeModuleName)) {
        return candidate;
    }
    return null;
}
