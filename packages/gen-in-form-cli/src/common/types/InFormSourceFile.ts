import ts from "typescript";
import { InFormSourceFileImports } from "./InFormSourceFileImports";

/**
 * File which contains important data for InForm generator
 */
export interface InFormSourceFile {
    file: ts.SourceFile;
    filepath: string;
    absoluteFilePath: string | null;
    imports: InFormSourceFileImports;
}
