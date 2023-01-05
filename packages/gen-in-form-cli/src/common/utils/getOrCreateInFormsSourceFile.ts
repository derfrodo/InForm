import { getCliArgumentsFromStore } from "@src/arguments/getCliArgumentsFromStore";
import { getInFormProgramFromStore } from "@src/common/getInFormProgramFromStore";
import { InFormSourceFileImports } from "@src/common/types/InFormSourceFileImports";
import { getImportsFromSourceFile } from "@src/common/utils/getImportsFromSourceFile";
import { getTypescriptSourceFile } from "@src/common/utils/typescript/getTypescriptSourceFile";
import { logTypescriptAst } from "@src/common/utils/logTypescriptAst";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import { store } from "@src/globalState/store";
import { commonActionCreators } from "../redux";
import { getAbsolutePath } from "./getAbsolutePath";
import ts from "typescript";
import { logAndError } from "@src/logging/logAndThrow";

export async function getOrCreateInFormsSourceFile(
    filepath: string
): Promise<InFormSourceFile> {
    const knownFiles = store.getState().common.inFormSourceFiles;
    const existing = knownFiles && knownFiles[filepath];
    if (existing) {
        return existing;
    }

    const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();

    log.debug(`Creating InFormsSourceFile`);

    const program = getInFormProgramFromStore(); // await createInFormTypescriptProgram(argv, fsHelper);
    const doc = getTypescriptSourceFile(filepath, program);
    const absoluteFilePath = getAbsolutePath(filepath);

    if (argv.logAsts) {
        log.debug(`Logging ast for file ${filepath} ...`);
        logTypescriptAst(doc, doc.statements);
    }

    const sourceFileImports: InFormSourceFileImports =
        await getImportsFromSourceFile(doc);

    const context: InFormSourceFile = {
        filepath,
        absoluteFilePath,
        imports: sourceFileImports,
        file: doc,
    };

    // Check if file has been resolved in the meantime
    // return cached one if necessary ;)
    const knownFilesCurrent = store.getState().common.inFormSourceFiles;
    if (knownFilesCurrent) {
        const storedFile = knownFilesCurrent[filepath];
        if (!storedFile) {
            store.dispatch(
                commonActionCreators.setInFormSourceFiles({
                    ...knownFilesCurrent,
                    [filepath]: context,
                })
            );
        } else {
            return storedFile;
        }
    } else {
        store.dispatch(
            commonActionCreators.setInFormSourceFiles({
                [filepath]: context,
            })
        );
    }

    return context;
}
export async function getOrCreateInFormsSourceFileFromNode(
    node: ts.Node
): Promise<InFormSourceFile> {
    const filepath = node.getSourceFile().fileName;

    if (!filepath) {
        throw logAndError(`No filepath resolved for node ${node.getText()}`, {
            node,
        });
    }

    const knownFiles = store.getState().common.inFormSourceFiles;
    const existing = knownFiles && knownFiles[filepath];
    if (existing) {
        return existing;
    }

    const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();

    log.debug(`Creating InFormsSourceFile`);

    const program = getInFormProgramFromStore(); // await createInFormTypescriptProgram(argv, fsHelper);
    const doc = getTypescriptSourceFile(filepath, program);
    const absoluteFilePath = getAbsolutePath(filepath);

    if (argv.logAsts) {
        log.debug(`Logging ast for file ${filepath} ...`);
        logTypescriptAst(doc, doc.statements);
    }

    const sourceFileImports: InFormSourceFileImports =
        await getImportsFromSourceFile(doc);

    const context: InFormSourceFile = {
        filepath,
        absoluteFilePath,
        imports: sourceFileImports,
        file: doc,
    };

    // Check if file has been resolved in the meantime
    // return cached one if necessary ;)
    const knownFilesCurrent = store.getState().common.inFormSourceFiles;
    if (knownFilesCurrent) {
        const storedFile = knownFilesCurrent[filepath];
        if (!storedFile) {
            store.dispatch(
                commonActionCreators.setInFormSourceFiles({
                    ...knownFilesCurrent,
                    [filepath]: context,
                })
            );
        } else {
            return storedFile;
        }
    } else {
        store.dispatch(
            commonActionCreators.setInFormSourceFiles({
                [filepath]: context,
            })
        );
    }

    return context;
}

export async function getOrCreateInFormsSourceFileFromSymbol(
    sym: ts.Symbol
): Promise<InFormSourceFile> {
    if (!sym.valueDeclaration) {
        throw logAndError(
            `No declaration node resolved for symbol ${sym.getName()}`,
            { sym }
        );
    }
    return await getOrCreateInFormsSourceFileFromNode(sym.valueDeclaration);
}
