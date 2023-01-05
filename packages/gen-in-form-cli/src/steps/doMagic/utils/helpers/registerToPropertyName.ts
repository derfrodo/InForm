import { logAndError } from "@src/logging/logAndThrow";
import {
    InFormTemplatePropertyOrMemberMappingModel,
    isInFormTemplatePropertyOrMemberMappingModel,
} from "@src/steps/resolveTemplateModels/types/InFormTemplatePropertyOrMemberMappingModel";
import Handlebars from "handlebars";

export const registerToPropertyName = (handlebars: typeof Handlebars): void => {
    handlebars.registerHelper(
        "toPropertyName",
        function (
            this: any,
            member: InFormTemplatePropertyOrMemberMappingModel | RuntimeOptions,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            arg2: RuntimeOptions
        ) {
            // const result = options.fn(registerEntry.context, {
            //     ...options,
            // });
            if (isInFormTemplatePropertyOrMemberMappingModel(member)) {
                // return name...
                return (member.name?.indexOf(".") ?? -1) >= 0
                    ? `"${member.name}"`
                    : member.name;
            }

            if (isInFormTemplatePropertyOrMemberMappingModel(this)) {
                // return name...
                return (this.name?.indexOf(".") ?? -1) >= 0
                    ? `"${this.name}"`
                    : this.name;
            }
            throw logAndError(
                "Failed to resolve InFormTemplatePropertyOrMemberMappingModel from parameter or this context",
                { self: this, member }
            );
        }
    );
};
