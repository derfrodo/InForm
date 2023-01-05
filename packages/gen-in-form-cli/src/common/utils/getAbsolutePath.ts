import { getInFormProgramFromStore } from "@src/common/getInFormProgramFromStore";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";

export function getAbsolutePath(sourcefile: ts.SourceFile): string | null;
export function getAbsolutePath(filepath: string): string | null;

export function getAbsolutePath(
    filepathOrSourcefile: string | ts.SourceFile
): string | null {
    const log = getGeneratorLogger();

    const program = getInFormProgramFromStore(); // await createInFormTypescriptProgram(argv, fsHelper);
    const realpath = program.host.realpath;
    if (!realpath) {
        log.error("Failed to resolve realpath method from program host!");
        return null;
    }
    const filepath =
        typeof filepathOrSourcefile === "string"
            ? filepathOrSourcefile
            : filepathOrSourcefile.fileName;
    log.debug("Resolve absolute path for file.", filepath);
    const absoluteFilePath = realpath(filepath);
    return absoluteFilePath;
}
