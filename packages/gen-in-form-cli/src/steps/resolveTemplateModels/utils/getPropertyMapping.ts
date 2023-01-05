import { getNameForProperty } from "@src/common/utils/typescript/getNameForProperty";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { MappedProperty } from "@src/steps/createFormModells/types/MappedProperty";
import { FormModell } from "../../createFormModells/types/FormModell";
import { InFormTemplatePropertyOrMemberMappingModel } from "../types/InFormTemplatePropertyOrMemberMappingModel";
import { MappedPropertyKeys } from "../types/MappedPropertyKeys";
import { createInFormTemplatePropertyOrMemberMappingModel } from "./createInFormTemplatePropertyOrMemberMappingModel";

export function getPropertyMapping(
    model: FormModell,
    key: MappedPropertyKeys
): InFormTemplatePropertyOrMemberMappingModel[] {
    const log = getGeneratorLogger();

    const propertyMappings: MappedProperty[] = model[key];

    if (!propertyMappings) {
        log.info("No mappings have been resolved. There will be no model.");
        return [];
    }
    const results: InFormTemplatePropertyOrMemberMappingModel[] = [];
    for (const prop of propertyMappings) {
        if (prop.mapped.length === 0) {
            log.info("Member has no mappings.", {
                name: getNameForProperty(prop.signature.name),
                key,
                mappingName: model.data.mappingInterfaceName,
                type: prop.signature.type?.getText(),
            });
        }
        const result: InFormTemplatePropertyOrMemberMappingModel =
            createInFormTemplatePropertyOrMemberMappingModel(prop, model);

        results.push(result);
    }

    return results;
}
