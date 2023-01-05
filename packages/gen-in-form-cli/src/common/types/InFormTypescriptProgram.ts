import ts from "typescript";

export type InFormTypescriptProgram = {
    program: ts.Program;
    host: ts.CompilerHost;
};
