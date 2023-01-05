import { logAndThrow } from "@src/logging/logAndThrow";
import { InFormGeneralSettingsData } from "@src/steps/searchGeneralSettings/types/InFormGeneralSettingsData";

export function getFilenameFromGeneralSettingsData(
    settings: InFormGeneralSettingsData
): string {
    const { argumentDeclarations } = settings;
    const filename = argumentDeclarations.mappingType.sourceFile?.fileName;
    if (!filename) {
        throw logAndThrow("No sourcefile for type mappings found", {
            settings,
        });
    }
    return filename;
}
