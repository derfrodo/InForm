import { InFormGeneralSettingsData } from "@src/steps/searchGeneralSettings/types/InFormGeneralSettingsData";
import { FormMappingData } from "@src/steps/searchMappings/types/FormMappingData";
import { MappedMember } from "./MappedMember";
import { MappedProperty } from "./MappedProperty";

/**
 * Model for Form which also includes mapping
 */
export interface FormModell {
    generalSettings: InFormGeneralSettingsData;
    /**
     * The actual mapping data and information
     */
    data: FormMappingData;

    /**
     * Already preresolved mapped input properties
     */
    mappedInputProperties: MappedProperty[];

    /**
     * Already preresolved mapped details properties
     */
    mappedDetailsProperties: MappedProperty[];

    /**
     * Already preresolved mapped input members
     */
    mappedInputMembers: MappedMember[];

    /**
     * Already preresolved mapped details members
     */
    mappedDetailsMembers: MappedMember[];
}
