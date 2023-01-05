import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { CliArgs } from "@src/common/types/CliArgs";
import { resolveFileCandidates } from "@src/common/utils/resolveFileCandidates";

export async function resolveFileCandidatesForGeneralSettings(
    argv: CliArgs,
    fsHelper: FileSystemHelper = new FileSystemHelper()
): Promise<string[]> {
    const log = getGeneratorLogger();
    log.debug("Resolving file candidates...");
    return resolveFileCandidates(
        argv.srcFolder,
        argv.globalSettingsFilesPattern,
        fsHelper
    );

    // const fileCandidates = (
    //     await Promise.all(
    //         argv.globalSettingsFilesPattern.map((pattern) =>
    //             fsHelper.findFiles(argv.srcFolder, pattern, {
    //                 includeNested: true,
    //             })
    //         )
    //     )
    // ).flat();
    // log.debug(
    //     "Files candidates resolved: ",
    //     JSON.stringify({ fileCandidates: JSON.stringify(fileCandidates) })
    // );
    // return fileCandidates;
}
