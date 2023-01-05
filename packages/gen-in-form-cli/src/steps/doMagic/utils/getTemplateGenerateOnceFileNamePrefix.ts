import type { InFormHandlebarTemplate } from "@src/steps/initializeTemplating/types/InFormHandlebarTemplate";

/**
 * Resolves generate Once Template name
 * @param template
 * @returns
 */
export function getTemplateGenerateOnceFileNamePrefix(
    template: InFormHandlebarTemplate
): string {
    let fullTemplateName = template.name;

    // remove possible extension
    fullTemplateName =
        fullTemplateName.lastIndexOf("_") > 0
            ? fullTemplateName.substring(0, fullTemplateName.lastIndexOf("_"))
            : fullTemplateName;
    // remove possible postfix
    fullTemplateName =
        fullTemplateName.lastIndexOf("_") > 0
            ? fullTemplateName.substring(0, fullTemplateName.lastIndexOf("_"))
            : fullTemplateName;
    return fullTemplateName;
}
