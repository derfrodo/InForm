import { FormMappingData } from "@src/steps/searchMappings/types/FormMappingData";
import { InFormSourceFile } from "../../../common/types/InFormSourceFile";

export interface InFormSourceFileAndFormMapping {
    sourceFile: InFormSourceFile;
    mappings: FormMappingData[];
}
