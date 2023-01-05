import { InFormRuntimeModuleName } from "@src/common/constants";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { getInterfacesOfTypeFromSourceFile } from "@src/common/utils/resolveInterfacesOfType/getInterfacesOfTypeFromSourceFile";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { InFormGeneralSettingsInterfaceName } from "../constants";
import { InFormSourceFileAndGeneralSettings } from "../types/InFormSourceFileAndGeneralSettings";
import { visitInterfaceGeneralSettingsCandidate } from "./visitors/visitInterfaceGeneralSettingsCandidate";

export async function getGeneralSettingsFromFile(
    sourceFile: InFormSourceFile
): Promise<InFormSourceFileAndGeneralSettings> {
    const { filepath } = sourceFile;
    const log = getGeneratorLogger();
    log.debug(`Check if file ${filepath} contains forms map ...`);

    const fileWithMatchingInterfaces = await getInterfacesOfTypeFromSourceFile(
        sourceFile,
        {
            baseInterfaceName: InFormGeneralSettingsInterfaceName,
            moduleName: InFormRuntimeModuleName,
        }
    );

    let mappingCandidate: InFormSourceFileAndGeneralSettings = {
        settingsData: [],
        sourceFile,
    };

    for await (const entry of fileWithMatchingInterfaces.data) {
        const { node } = entry;
        if (ts.isInterfaceDeclaration(node)) {
            mappingCandidate = await visitInterfaceGeneralSettingsCandidate(
                node,
                mappingCandidate
            );
        }
    }
    return mappingCandidate;
}
