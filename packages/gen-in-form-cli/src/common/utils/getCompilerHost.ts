import ts from "typescript";


export function getCompilerHost(options: ts.CompilerOptions): ts.CompilerHost {
    const host = ts.createCompilerHost(options);
    return host;
}
