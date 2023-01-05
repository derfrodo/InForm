import { FormMappingData } from "./FormMappingData";

export type FileWithFormMappings = {
    /**
     * file which contains form mappings of {@link FileWithFormMappings.mappings} property
     */
    filePath: string;

    mappings: FormMappingData[];
};
