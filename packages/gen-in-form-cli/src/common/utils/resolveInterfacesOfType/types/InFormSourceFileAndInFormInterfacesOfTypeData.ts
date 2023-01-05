import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import ts from "typescript";
import { InFormInterfacesOfTypeData } from "./InFormInterfacesOfTypeData";

export interface InFormSourceFileAndInFormInterfacesOfTypeData {
    sourceFile: InFormSourceFile;
    data: InFormInterfacesOfTypeData<
        ts.InterfaceDeclaration | ts.TypeAliasDeclaration
    >[];
}
