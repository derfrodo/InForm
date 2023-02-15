import { getCliArgumentsFromStore } from "@src/arguments/getCliArgumentsFromStore";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";
import { logTypescriptAst } from "../logTypescriptAst";
import { logTypescriptNode } from "../logTypescriptNode";
import { debugTypescriptNode } from "../debugTypescriptNode";
import { getDocFromInFormSourceFile } from "../typescript/getDocFromInFormSourceFile";
import { GetInterfacesOfTypeOptions } from "./types/GetInterfacesOfTypeOptions";
import { InFormSourceFileAndInFormInterfacesOfTypeData } from "./types/InFormSourceFileAndInFormInterfacesOfTypeData";
import { visitInterfaceInFormInterfacesOfTypeDataCandidate } from "./visitors/visitInterfaceGeneralSettingsCandidate";

export async function getInterfacesOfTypeFromSourceFile<
    TInterface extends string
>(
    sourceFile: InFormSourceFile,
    options: GetInterfacesOfTypeOptions<TInterface>
): Promise<InFormSourceFileAndInFormInterfacesOfTypeData> {
    const { filepath } = sourceFile;
    const doc = getDocFromInFormSourceFile(sourceFile);
    const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();

    if (argv.logAsts) {
        log.debug(`Logging ast for file ${filepath} ...`);
        logTypescriptAst(doc, doc.statements);
    }
    const context: InFormSourceFileAndInFormInterfacesOfTypeData = {
        data: [],
        sourceFile,
    };

    for await (const node of doc.statements) {
        switch (node.kind) {
            case ts.SyntaxKind.InterfaceDeclaration:
                if (ts.isInterfaceDeclaration(node)) {
                    await visitInterfaceInFormInterfacesOfTypeDataCandidate(
                        node,
                        context,
                        options
                    );
                } else {
                    log.warn(
                        `Node is expected to be interface, but casting failed (Text ${node.getText(
                            doc
                        )})`
                    );
                    logTypescriptNode(node, null);
                }
                break;
            case ts.SyntaxKind.TypeAliasDeclaration:
                break;
            case ts.SyntaxKind.ImportDeclaration:
                // imports ignored (well as of now)
                break;
            default:
                log.debug(`Unexpected node found (Text ${node.getText(doc)})`);
                debugTypescriptNode(node, null);
                break;
        }
    }
    if (context.data.length === 0) {
        log.debug(
            `File ${filepath} does not import ${options.baseInterfaceName}. Therefore it can not contain any declarations.`
        );
    } else {
        log.debug(
            `File ${filepath} contains ${context.data.length} interfaces which extend ${options.baseInterfaceName} ...`
        );
    }

    return context;
}
