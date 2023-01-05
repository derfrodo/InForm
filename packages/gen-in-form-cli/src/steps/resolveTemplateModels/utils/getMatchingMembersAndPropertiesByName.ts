import { FormModell } from "../../createFormModells/types/FormModell";
import { createInFormTemplatePropertyOrMemberMappingModel } from "./createInFormTemplatePropertyOrMemberMappingModel";
import { MatchingInFormTeplateMember } from "../types/MatchingInFormTeplateMember";

export function getMatchingMembersAndPropertiesByName(
    model: FormModell
): MatchingInFormTeplateMember[] {
    return [...model.mappedInputMembers, ...model.mappedInputProperties]
        .map((input) => {
            const inputTemplateModel =
                createInFormTemplatePropertyOrMemberMappingModel(input, model);
            return [
                ...model.mappedDetailsProperties,
                ...model.mappedDetailsMembers,
            ]
                .filter((detail) => detail.name === input.name)
                .map((detail) => ({
                    input: inputTemplateModel,
                    detail: createInFormTemplatePropertyOrMemberMappingModel(
                        detail,
                        model
                    ),
                }));
        })
        .flat();
}
