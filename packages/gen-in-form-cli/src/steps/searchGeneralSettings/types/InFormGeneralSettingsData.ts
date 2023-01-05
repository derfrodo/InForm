import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import ts from "typescript";
import { InFormGeneralSettingsArgumentDeclarations } from "./InFormGeneralSettingsArgumentDeclarations";

export interface InFormGeneralSettingsData {
    sourceFile: InFormSourceFile;
    settingsInterface: string;
    settingsNode: ts.InterfaceDeclaration | ts.TypeAliasDeclaration;

    argumentDeclarations: InFormGeneralSettingsArgumentDeclarations;
}
