import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { CliArgs } from "@src/common/types/CliArgs";
import { InFormTypescriptProgram } from "@src/common/types/InFormTypescriptProgram";
import ts from "typescript";
import { resolveFileCandidates } from "./resolveFileCandidates";

function getCompilerHost(options: ts.CompilerOptions): ts.CompilerHost {
    const host = ts.createCompilerHost(options);
    return host;
}

export async function createInFormTypescriptProgram(
    argv: CliArgs,
    fsHelper: FileSystemHelper = new FileSystemHelper()
): Promise<InFormTypescriptProgram> {
    const options: ts.CompilerOptions = {
        allowJs: false,
        target: ts.ScriptTarget.ES2015,
    };

    const host = getCompilerHost(options);
    const programFiles = await resolveFileCandidates(
        argv.srcFolder,
        argv.programFilesPattern,
        fsHelper
    );
    const program = ts.createProgram(programFiles, options, host);
    return { program, host };
}
