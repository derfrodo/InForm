import { getInFormProgramFromStore } from "@src/common/getInFormProgramFromStore";
import { InFormTypescriptProgram } from "@src/common/types/InFormTypescriptProgram";
import ts from "typescript";

export function getTypescriptSourceFile(
    filepath: string,
    program?: InFormTypescriptProgram
): ts.SourceFile {
    program = program ?? getInFormProgramFromStore();
    const doc = program.program.getSourceFile(filepath);
    if (!doc) {
        throw new Error(`Failed to open Source file ${filepath}`);
    }

    return doc;
}
