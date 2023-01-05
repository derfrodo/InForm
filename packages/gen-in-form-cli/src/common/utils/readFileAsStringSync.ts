import { readFileSync } from "fs";

export function readFileAsStringSync(
    filePath: string,
    encoding: BufferEncoding = "utf8"
): string {
    const content = readFileSync(filePath);
    const rslt = content.toString(encoding);
    return rslt;
}
