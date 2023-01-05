import { store } from "@src/globalState";
import handlebars from "handlebars";
import path from "path";
import { getGeneratorLogger } from "../../logging/getGeneratorLogger";
import { getGeneralSettingsFromState } from "../searchGeneralSettings/utils/getGeneralSettingsFromState";
import { getTemplateFilenameEnding } from "./utils/getTemplateFilenameEnding";
import { getTemplateGenerateOnceFileNamePrefix } from "./utils/getTemplateGenerateOnceFileNamePrefix";
import { initializeHelpers } from "./utils/initializeHelpers";
import { writeFile } from "./utils/writeFile";

export const doMagic = async (): Promise<void> => {
    // const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();
    log.info(`🧙‍♂️🧙‍♀️`);
    const { getState } = store;
    const { steps } = getState();
    const { initializeTemplating, resolveTemplateModels } = steps;

    await initializeHelpers();
    for (const partial of initializeTemplating.partials) {
        handlebars.registerPartial(partial.name, partial.template);
    }

    for (const model of resolveTemplateModels.templateFormModels) {
        const nodeName: string = model.name;
        const sourceFile: string = model.sourceFile;
        const parent = path.dirname(sourceFile);

        log.info(`Create files for ${nodeName} in ${sourceFile}`);
        for (const template of initializeTemplating.templates) {
            log.info(
                `Create file content for template ${template.name} in ${template.filepath} for model of ${nodeName}`
            );

            const code = handlebars.compile(template.template, {
                noEscape: true,
            })(model);

            await writeFile(
                path.join(
                    parent,
                    `${nodeName}${getTemplateFilenameEnding(template)}`
                ),
                code
            );
        }
        for (const template of initializeTemplating.templateScaffold) {
            log.info(
                `Create file content for template ${template.name} in ${template.filepath} for model of ${nodeName}`
            );

            const code = handlebars.compile(template.template, {
                noEscape: true,
            })(model);

            const fullFileName = path.join(
                parent,
                `${nodeName}${getTemplateFilenameEnding(template, false)}`
            );

            if (!(await writeFile(fullFileName, code, false))) {
                log.warn(
                    `Will not overwrite file at "${fullFileName}" for ${nodeName}. This template has been registered as scaffold template.`
                    // { template }
                );
            }
        }
    }

    const gs = getGeneralSettingsFromState();

    for (const template of initializeTemplating.templateGenerateOnce) {
        const baseDirPath = path.dirname(gs.sourceFile.filepath);
        log.info(
            `Create file content for template (create once) ${template.name} in ${template.filepath} at filepath ${baseDirPath}`
        );

        const code = handlebars.compile(template.template, {
            noEscape: true,
        })({});

        await writeFile(
            path.join(
                baseDirPath,
                `${getTemplateGenerateOnceFileNamePrefix(
                    template
                )}${getTemplateFilenameEnding(template, true)}`
            ),
            code
        );
    }

    for (const template of initializeTemplating.templateScaffoldOnce) {
        const baseDirPath = path.dirname(gs.sourceFile.filepath);
        log.info(
            `Create file content for template (create once) ${template.name} in ${template.filepath} at filepath ${baseDirPath}`
        );

        const code = handlebars.compile(template.template, {
            noEscape: true,
        })({});

        const fullFileName = path.join(
            baseDirPath,
            `${getTemplateGenerateOnceFileNamePrefix(
                template
            )}${getTemplateFilenameEnding(template, false)}`
        );

        if (!(await writeFile(fullFileName, code, false))) {
            log.warn(
                `Will not overwrite file at "${fullFileName}". This template has been registered as scaffold template.`
                // { template }
            );
        }
    }
};
