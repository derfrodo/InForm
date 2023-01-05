import { InFormTemplatePropertyOrMemberMappingModel } from "./InFormTemplatePropertyOrMemberMappingModel";

export type MatchingInFormTeplateMember = {
    input: InFormTemplatePropertyOrMemberMappingModel;
    detail: InFormTemplatePropertyOrMemberMappingModel | null;
};
