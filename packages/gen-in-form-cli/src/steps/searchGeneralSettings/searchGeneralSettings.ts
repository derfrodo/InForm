import { getCliArgumentsFromStore } from "@src/arguments/getCliArgumentsFromStore";
import { getOrCreateInFormsSourceFile } from "@src/common/utils/getOrCreateInFormsSourceFile";
import { store } from "@src/globalState";
import { getGeneratorLogger } from "../../logging/getGeneratorLogger";
import { searchGeneralSettingsActionCreators } from "./redux";
import { InFormSourceFileAndGeneralSettings } from "./types/InFormSourceFileAndGeneralSettings";
import { getGeneralSettingsFromFile } from "./utils/getGeneralSettingsFromFile";
import { resolveFileCandidatesForGeneralSettings } from "./utils/resolveFileCandidatesForGeneralSettings";

export const searchGeneralSettings = async (): Promise<
    InFormSourceFileAndGeneralSettings[]
> => {
    const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();
    log.info("Search for generalSettings...");

    const candidates = await resolveFileCandidatesForGeneralSettings(argv);
    log.info(
        `Found ${candidates.length} files which may contain general settings for forms.`
    );

    const candidatesToMappings: InFormSourceFileAndGeneralSettings[] = [];

    for await (const candidate of candidates) {
        const file = await getOrCreateInFormsSourceFile(candidate);
        const settings = await getGeneralSettingsFromFile(file);
        candidatesToMappings.push(settings);
    }

    const filesWithGeneralSettings: InFormSourceFileAndGeneralSettings[] =
        candidatesToMappings.filter((c) => c.settingsData.length > 0);

    log.info(
        `${filesWithGeneralSettings.length} files contains general settings for in form.`
    );

    store.dispatch(
        searchGeneralSettingsActionCreators.setGeneralSettings(
            filesWithGeneralSettings
        )
    );

    return filesWithGeneralSettings;
    // TODO: Go on and filter;)
};
