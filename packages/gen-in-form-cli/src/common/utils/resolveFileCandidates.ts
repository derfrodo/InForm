import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";

export async function resolveFileCandidates(
    srcFolder: string,
    filePatterns: string | string[],
    fsHelper: FileSystemHelper = new FileSystemHelper()
): Promise<string[]> {
    const log = getGeneratorLogger();
    log.debug("Resolving file candidates...");
    const fileCandidates = (
        await Promise.all(
            typeof filePatterns === "string"
                ? [
                      fsHelper.findFiles(srcFolder, filePatterns, {
                          includeNested: true,
                      }),
                  ]
                : filePatterns.map((pattern) =>
                      fsHelper.findFiles(srcFolder, pattern, {
                          includeNested: true,
                      })
                  )
        )
    ).flat();

    log.debug(
        "Files candidates resolved: ",
        JSON.stringify({ fileCandidates: JSON.stringify(fileCandidates) })
    );
    return fileCandidates;
}
