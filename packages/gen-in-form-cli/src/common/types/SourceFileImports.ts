import ts from "typescript";
import { InFormSourceFileImports } from "./InFormSourceFileImports";

export type SourceFileImports = {
    sourceFileImports: InFormSourceFileImports;
    sourceFile: ts.SourceFile;
};
