import { getCliArgumentsFromStore } from "@src/arguments/getCliArgumentsFromStore";
import { store } from "@src/globalState";
import { getGeneratorLogger } from "../../logging/getGeneratorLogger";
import { initializeTemplatingActionCreators } from "./redux";
import { InFormHandlebarTemplate } from "./types/InFormHandlebarTemplate";
import { getTemplatesFromFileOrFolder } from "./utils/getTemplatesFromFolder";

export const initializeTemplates = async (): Promise<{
    partials: InFormHandlebarTemplate[];
    templates: InFormHandlebarTemplate[];
}> => {
    const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();
    log.info(
        `Hi from template initialization! In terms of progress of code generation: We are almost there...`
    );

    const {
        templatePartialsPath,
        templatesPath,
        templatePartialsRecursive,
        templateGenerateOncePath,
        templateScaffoldOncePath,
        templateScaffoldPath,
    } = argv;
    const partials =
        typeof templatePartialsPath === "string"
            ? await getTemplatesFromFileOrFolder(
                  templatePartialsPath,
                  templatePartialsRecursive
              )
            : (
                  await Promise.all(
                      templatePartialsPath.map(
                          async (v) =>
                              await getTemplatesFromFileOrFolder(
                                  v,
                                  templatePartialsRecursive
                              )
                      )
                  )
              ).flat();
    const templates =
        typeof templatesPath === "string"
            ? await getTemplatesFromFileOrFolder(templatesPath)
            : (
                  await Promise.all(
                      templatesPath.map(
                          async (v) => await getTemplatesFromFileOrFolder(v)
                      )
                  )
              ).flat();

    const templateGenerateOnce =
        typeof templateGenerateOncePath === "string"
            ? await getTemplatesFromFileOrFolder(templateGenerateOncePath)
            : (
                  await Promise.all(
                      templateGenerateOncePath.map(
                          async (v) => await getTemplatesFromFileOrFolder(v)
                      )
                  )
              ).flat();

    const templateScaffoldOnce =
        typeof templateScaffoldOncePath === "string"
            ? await getTemplatesFromFileOrFolder(templateScaffoldOncePath)
            : (
                  await Promise.all(
                      templateScaffoldOncePath.map(
                          async (v) => await getTemplatesFromFileOrFolder(v)
                      )
                  )
              ).flat();

    const templateScaffold =
        typeof templateScaffoldPath === "string"
            ? await getTemplatesFromFileOrFolder(templateScaffoldPath)
            : (
                  await Promise.all(
                      templateScaffoldPath.map(
                          async (v) => await getTemplatesFromFileOrFolder(v)
                      )
                  )
              ).flat();

    log.debug(
        `Found ${templateGenerateOnce.length} templates to be generated once`,
        { templateGenerateOnce }
    );
    log.debug(
        `Found ${templateScaffoldOnce.length} templates to be generated once as scaffold`,
        { templateScaffoldOnce }
    );
    store.dispatch(initializeTemplatingActionCreators.setPartials(partials));
    store.dispatch(initializeTemplatingActionCreators.setTemplates(templates));
    store.dispatch(
        initializeTemplatingActionCreators.setTemplateGenerateOnce(
            templateGenerateOnce
        )
    );
    store.dispatch(
        initializeTemplatingActionCreators.setTemplateScaffold(templateScaffold)
    );
    store.dispatch(
        initializeTemplatingActionCreators.setTemplateScaffoldOnce(
            templateScaffoldOnce
        )
    );

    return {
        partials,
        templates,
    };
};
