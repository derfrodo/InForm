import { readFile } from "fs";
import { promisify } from "util";

export const readFilePromise = promisify(readFile);

export async function readFileAsStringPromise(
    filePath: string,
    encoding: BufferEncoding = "utf8"
): Promise<string> {
    const content = await readFilePromise(filePath);
    const rslt = content.toString(encoding);
    return rslt;
}
