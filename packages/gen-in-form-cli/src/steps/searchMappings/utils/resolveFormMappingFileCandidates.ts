import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { CliArgs } from "@src/common/types/CliArgs";
import { resolveFileCandidates } from "@src/common/utils/resolveFileCandidates";

export function resolveFormMappingFileCandidates(
    argv: CliArgs,
    fsHelper: FileSystemHelper = new FileSystemHelper()
): Promise<string[]> {
    const log = getGeneratorLogger();
    log.debug("Resolving file form mapping candidates...");
    return resolveFileCandidates(
        argv.srcFolder,
        argv.mappingFilesPattern,
        fsHelper
    );
}
