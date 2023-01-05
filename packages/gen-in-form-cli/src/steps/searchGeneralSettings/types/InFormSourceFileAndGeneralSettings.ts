import { InFormSourceFile } from "../../../common/types/InFormSourceFile";
import { InFormGeneralSettingsData } from "./InFormGeneralSettingsData";

export interface InFormSourceFileAndGeneralSettings {
    sourceFile: InFormSourceFile;
    settingsData: InFormGeneralSettingsData[];
}
