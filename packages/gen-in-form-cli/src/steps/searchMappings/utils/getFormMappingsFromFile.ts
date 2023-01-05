import { InFormRuntimeModuleName } from "@src/common/constants";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { getInterfacesOfTypeFromSourceFile } from "@src/common/utils/resolveInterfacesOfType/getInterfacesOfTypeFromSourceFile";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { InFormSourceFileAndFormMapping } from "@src/steps/searchMappings/types/InFormSourceFileAndFormMapping";
import ts from "typescript";
import { InFormMappingInterfaceName } from "../constants";
import { visitInterfaceMappingCandidate } from "./visitors/visitInterfaceMappingCandidate";

export async function getFormMappingsFromFile(
    file: InFormSourceFile
): Promise<InFormSourceFileAndFormMapping> {
    const log = getGeneratorLogger();
    log.debug(`Check if file ${file.filepath} contains forms map ...`);

    const fileWithMatchingInterfaces = await getInterfacesOfTypeFromSourceFile(
        file,
        {
            baseInterfaceName: InFormMappingInterfaceName,
            moduleName: InFormRuntimeModuleName,
        }
    );

    let mappingCandidate: InFormSourceFileAndFormMapping = {
        sourceFile: fileWithMatchingInterfaces.sourceFile,
        mappings: [],
    };

    for await (const entry of fileWithMatchingInterfaces.data) {
        const { node } = entry;
        if (ts.isInterfaceDeclaration(node)) {
            mappingCandidate = await visitInterfaceMappingCandidate(
                node,
                mappingCandidate
            );
        }
    }

    log.debug(
        `File ${file.filepath} contains ${mappingCandidate.mappings.length} interfaces which extend ${InFormMappingInterfaceName} ...`
    );

    return mappingCandidate;
}
