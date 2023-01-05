import type { InFormHandlebarTemplate } from "@src/steps/initializeTemplating/types/InFormHandlebarTemplate";

/**
 * Resolves ending of file name - resolves extension and postfix from template name. You have to add the "prefix", though.
 * Might add .generated if you want (otherwise set parameter to false)
 * @param template
 * @returns
 */
export function getTemplateFilenameEnding(
    template: InFormHandlebarTemplate,
    addGeneratedFlag = true
): string {
    let fullTemplateName = template.name;
    const ext =
        fullTemplateName.lastIndexOf("_") > 0
            ? fullTemplateName.substring(fullTemplateName.lastIndexOf("_") + 1)
            : "tsx";
    fullTemplateName =
        fullTemplateName.lastIndexOf("_") > 0
            ? fullTemplateName.substring(0, fullTemplateName.lastIndexOf("_"))
            : fullTemplateName;

    const postfix =
        fullTemplateName.lastIndexOf("_") > 0
            ? fullTemplateName.substring(fullTemplateName.lastIndexOf("_") + 1)
            : "";
    return `${postfix}${addGeneratedFlag ? ".generated" : ""}.${ext}`;
}
