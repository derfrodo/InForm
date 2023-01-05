import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { InFormsSourceImportInfo } from "@src/common/types/InFormsSourceImportInfo";
import { isModule } from "@src/common/utils/isModule";
import { getTypeInFormsImportInfo } from "../../getTypeInFormsImportInfo";
import { GetInterfacesOfTypeOptions } from "../types/GetInterfacesOfTypeOptions";

/**
 * returns the InFormsSourceImportInfo for the mapping interface of informs generator if there is any
 * @param context
 * @returns {InFormsSourceImportInfo}
 */
export function getInFormsSourceImportInfoForInFormInterfacesOfTypeData<
    TInterface extends string
>(
    context: InFormSourceFile,
    options: GetInterfacesOfTypeOptions<TInterface>
): InFormsSourceImportInfo | null {
    const candidate = getTypeInFormsImportInfo(
        context,
        options.baseInterfaceName
    );
    if (isModule(candidate, options.moduleName)) {
        return candidate;
    }
    return null;
}
