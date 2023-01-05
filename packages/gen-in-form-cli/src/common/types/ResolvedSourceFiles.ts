import { InFormSourceFile } from "./InFormSourceFile";

export type ResolvedSourceFiles = {
    [key in string]?: InFormSourceFile;
};
