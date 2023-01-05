import { store } from "@src/globalState";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import type { InFormGeneralSettingsData } from "../types/InFormGeneralSettingsData";

export function getGeneralSettingsFromState(): InFormGeneralSettingsData {
    const log = getGeneratorLogger();

    const { getState } = store;
    const { generalSettings } = getState().steps.generalSettings;
    if (!generalSettings || generalSettings.length != 1) {
        const msg = `General Settings are not available in store. We need exactly one general setting, but found ${
            generalSettings?.length ?? "none"
        }`;
        log.error(msg);
        throw new Error(msg);
    }
    const settings = generalSettings[0];
    const settingsData = settings?.settingsData;
    if (!settingsData || settingsData?.length != 1) {
        const msg = `General Settings data not available in store. We need exactly one general setting, but found ${
            settingsData.length ?? "none"
        }`;
        log.error(msg);
        throw new Error(msg);
    }

    return settingsData[0];
}
