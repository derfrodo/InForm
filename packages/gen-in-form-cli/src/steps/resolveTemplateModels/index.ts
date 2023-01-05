import { store } from "@src/globalState";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { resolveTemplateModelsActionCreators } from "./redux";
import { createInFormTemplateFormModel } from "./utils/createInFormTemplateFormModel";
import { InFormTemplateFormModel } from "./types/InFormTemplateFormModel";

export async function resolveTemplateModels(): Promise<{
    inFormTemplateFormModels: InFormTemplateFormModel[];
}> {
    // const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();
    log.info(`Preparing the wands for the magic...`);

    const { dispatch, getState } = store;
    const { steps } = getState();
    const { createFormModells } = steps;

    const inFormTemplateFormModels: InFormTemplateFormModel[] = [];
    for (const model of createFormModells.formModells) {
        const inFormTemplateFormModel: InFormTemplateFormModel =
            createInFormTemplateFormModel(model);
        inFormTemplateFormModels.push(inFormTemplateFormModel);
    }

    dispatch(
        resolveTemplateModelsActionCreators.setTemplateFormModels(
            inFormTemplateFormModels
        )
    );
    return { inFormTemplateFormModels };
}
