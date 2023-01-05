import { InFormSourceFileAndFormMapping } from "../types/InFormSourceFileAndFormMapping";

export interface State {
    isThrowOnUnexpectedTsNodeInFile: boolean;
    isThrowOnTypeAliasTsNodeInFile: boolean;

    mappings: InFormSourceFileAndFormMapping[];
}
