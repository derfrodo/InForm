import { getDocFromInFormSourceFile } from "@src/common/utils/typescript/getDocFromInFormSourceFile";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { InFormGeneralSettingsData } from "../../types/InFormGeneralSettingsData";
import { InFormSourceFileAndGeneralSettings } from "../../types/InFormSourceFileAndGeneralSettings";
import { getInFormGeneralSettingsArgumentDeclarations } from "./getInFormGeneralSettingsArgumentDeclarations";
import { visitInterfaceHeritageNodes } from "./visitInterfaceHeritageNodes";

export async function visitInterfaceGeneralSettingsCandidate(
    node: ts.InterfaceDeclaration,
    context: InFormSourceFileAndGeneralSettings
): Promise<InFormSourceFileAndGeneralSettings> {
    const log = getGeneratorLogger();
    const { settingsData: currentData, ...rest } = context;
    const { sourceFile } = rest;
    const { filepath } = sourceFile;
    const doc = getDocFromInFormSourceFile(sourceFile);
    const settingsData = [...currentData];

    const generalSettingsNode = await visitInterfaceHeritageNodes(
        node,
        sourceFile
    );
    if (generalSettingsNode) {
        const settingsInterface = node.name.getText(doc);
        log.debug(`Found mapping in ${filepath}: ${settingsInterface}`);

        const data: InFormGeneralSettingsData = {
            sourceFile,
            settingsInterface: settingsInterface,
            settingsNode: node,
            argumentDeclarations:
                getInFormGeneralSettingsArgumentDeclarations(
                    generalSettingsNode
                ),
        };

        settingsData.push(data);
    }
    return { ...rest, settingsData };
}
