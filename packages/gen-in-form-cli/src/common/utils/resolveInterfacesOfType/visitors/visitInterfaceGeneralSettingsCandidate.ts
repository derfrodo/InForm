import { getDocFromInFormSourceFile } from "@src/common/utils/typescript/getDocFromInFormSourceFile";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { InFormInterfacesOfTypeData } from "../types/InFormInterfacesOfTypeData";
import { GetInterfacesOfTypeOptions } from "../types/GetInterfacesOfTypeOptions";
import { InFormSourceFileAndInFormInterfacesOfTypeData } from "../types/InFormSourceFileAndInFormInterfacesOfTypeData";
import { visitInterfaceHeritageNodes } from "./visitInterfaceHeritageNodes";

export async function visitInterfaceInFormInterfacesOfTypeDataCandidate<
    TInterface extends string
>(
    node: ts.InterfaceDeclaration,
    context: InFormSourceFileAndInFormInterfacesOfTypeData,
    options: GetInterfacesOfTypeOptions<TInterface>
): Promise<InFormSourceFileAndInFormInterfacesOfTypeData> {
    const log = getGeneratorLogger();
    const { data, sourceFile } = context;
    const { filepath } = sourceFile;
    const doc = getDocFromInFormSourceFile(sourceFile);

    const matchingInterfaceNode = await visitInterfaceHeritageNodes(
        node,
        sourceFile,
        options
    );
    if (matchingInterfaceNode) {
        const interfaceName = node.name.getText(doc);
        log.debug(`Found mapping in ${filepath}: ${interfaceName}`);

        const entry: InFormInterfacesOfTypeData<ts.InterfaceDeclaration> = {
            node: node,
            sourceFile,
            interfaceName: interfaceName,
        };

        data.push(entry);
    }
    return context;
}
