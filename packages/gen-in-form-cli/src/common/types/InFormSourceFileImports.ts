import ts from "typescript";
import { InFormsSourceImportInfo } from "./InFormsSourceImportInfo";

export type InFormSourceFileImports = {
    fileInfo: ts.PreProcessedFileInfo;
    imports: InFormsSourceImportInfo[];
};
