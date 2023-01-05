import { getCliArgumentsFromStore } from "@src/arguments/getCliArgumentsFromStore";
import { getOrCreateInFormsSourceFile } from "@src/common/utils/getOrCreateInFormsSourceFile";
import { store } from "@src/globalState";
import { getGeneratorLogger } from "../../logging/getGeneratorLogger";
import { InFormMappingInterfaceName } from "./constants";
import { searchMappingsActionCreators } from "./redux";
import { InFormSourceFileAndFormMapping } from "./types/InFormSourceFileAndFormMapping";
import { getFormMappingsFromFile } from "./utils/getFormMappingsFromFile";
import { resolveFormMappingFileCandidates } from "./utils/resolveFormMappingFileCandidates";

export const searchMappings = async (): Promise<
    InFormSourceFileAndFormMapping[]
> => {
    const argv = getCliArgumentsFromStore();
    const log = getGeneratorLogger();
    log.info(
        `Search for files with interfaces which extend ${InFormMappingInterfaceName} from runtime...`
    );

    const candidates = await resolveFormMappingFileCandidates(argv);
    log.info(
        `Found ${candidates.length} files which may contain maps for forms.`
    );

    const candidatesToMappings: InFormSourceFileAndFormMapping[] = [];

    for await (const candidate of candidates) {
        const file = await getOrCreateInFormsSourceFile(candidate);
        const fileMappings = await getFormMappingsFromFile(file);

        candidatesToMappings.push(fileMappings);
    }

    const filesWithMappings: InFormSourceFileAndFormMapping[] =
        candidatesToMappings.filter((c) => c.mappings.length > 0);

    log.info(
        `${filesWithMappings.length} files contains mappings for in form.`
    );

    store.dispatch(searchMappingsActionCreators.setMappings(filesWithMappings));

    return filesWithMappings;
};
