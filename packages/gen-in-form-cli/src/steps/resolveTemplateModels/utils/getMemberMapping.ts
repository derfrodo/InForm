import { getNameForProperty } from "@src/common/utils/typescript/getNameForProperty";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { FormModell } from "../../createFormModells/types/FormModell";
import { InFormTemplatePropertyOrMemberMappingModel } from "../types/InFormTemplatePropertyOrMemberMappingModel";
import { MappedMemberKeys } from "../types/MappedMemberKeys";
import { createInFormTemplatePropertyOrMemberMappingModel } from "./createInFormTemplatePropertyOrMemberMappingModel";

export function getMemberMapping(
    model: FormModell,
    key: MappedMemberKeys
): InFormTemplatePropertyOrMemberMappingModel[] {
    const log = getGeneratorLogger();

    const memberMappings = model[key];

    if (!memberMappings) {
        log.info("No mappings have been resolved. There will be no model.");
        return [];
    }
    const results: InFormTemplatePropertyOrMemberMappingModel[] = [];
    for (const prop of memberMappings) {
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
