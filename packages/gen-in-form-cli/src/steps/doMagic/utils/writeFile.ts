import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import fs, { writeFile as wfs, access, mkdir } from "fs";
import { promisify } from "util";
import path from "path";

export const exists = async (
    filePath: string,
    mode: number | undefined = fs.constants.W_OK
): Promise<boolean> => {
    try {
        // await promisify(access)(
        //     filePath,
        //     fs.constants.W_OK | fs.constants.R_OK
        // );
        await promisify(access)(filePath, mode);
        return true;
    } catch (e) {
        // best efford
    }
    return false;
};
/**
 *
 * @param filePath
 * @param content
 * @param overwrite
 * @returns true if file has been sucessfully written, false if file is not to be written due to overwrite parameter
 */
export async function writeFile(
    filePath: string,
    content: string,
    overwrite = true
): Promise<boolean> {
    const log = getGeneratorLogger();
    if (!overwrite && (await exists(filePath))) {
        log.error(`Must not overwrite file ${filePath}`);
        return false;
    }
    try {
        const parentDir = path.dirname(filePath);
        await promisify(mkdir)(parentDir, { recursive: true });
    } catch (e) {
        log.error(`Creating directory failed. Is it existing already?`);
    }
    await promisify(wfs)(filePath, content, {
        encoding: "utf8",
        // flag:"w+"
    });
    return true;
}
