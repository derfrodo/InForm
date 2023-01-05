import { InFormSourceFile } from "@src/common/types/InFormSourceFile";
import ts from "typescript";

export type InFormInterfacesOfTypeData<
    T extends ts.InterfaceDeclaration | ts.TypeAliasDeclaration
> = T extends ts.InterfaceDeclaration
    ? {
          sourceFile: InFormSourceFile;
          interfaceName: string;
          node: T;
      }
    : {
          sourceFile: InFormSourceFile;
          typeName: string;
          node: T;
      };
