import { getInFormProgramFromStore } from "@src/common/getInFormProgramFromStore";
import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import ts from "typescript";
import { getTypescriptSourceFile } from "./getTypescriptSourceFile";

export function getDocFromInFormSourceFile(
    context: InFormSourceFile
): ts.SourceFile {
    const { filepath } = context;
    const program = getInFormProgramFromStore(); // await createInFormTypescriptProgram(argv, fsHelper);
    const doc = getTypescriptSourceFile(filepath, program);
    return doc;
}
