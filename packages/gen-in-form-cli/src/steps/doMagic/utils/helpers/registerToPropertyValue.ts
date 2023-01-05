import { logAndError } from "@src/logging/logAndThrow";
import { MappedLiteralSymbolInfoLiteralTypes } from "@src/steps/createFormModells/types/MappedSymbolForPropertyFromGeneralSetting";
import {
    DefaultValueModel,
    isDefaultValueModel,
} from "@src/steps/resolveTemplateModels/types/InFormTemplatePropertyOrMemberMappingModel";
import Handlebars from "handlebars";

export const registerToPropertyValue = (
    handlebars: typeof Handlebars
): void => {
    handlebars.registerHelper(
        "toPropertyValue",
        function (
            this: any,
            member: DefaultValueModel | RuntimeOptions,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            arg2: RuntimeOptions
        ) {
            // const result = options.fn(registerEntry.context, {
            //     ...options,
            // });
            if (isDefaultValueModel(member)) {
                return member.type ===
                    MappedLiteralSymbolInfoLiteralTypes.string
                    ? `"${member.value}"`
                    : member.value;
            }

            if (isDefaultValueModel(this)) {
                return this.type === MappedLiteralSymbolInfoLiteralTypes.string
                    ? `"${this.value}"`
                    : this.value;
            }
            logAndError(
                "Failed to resolve default value from parameter or this context",
                {
                    self: this,
                    member,
                }
            );
            return `Failed to resolve default value from member ${member} - context: ${JSON.stringify(
                this
            )}`;
        }
    );
};
