import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";

export function getEscapedTextAsString(
    escapedText: ts.__String | null | undefined
): string | null {
    const log = getGeneratorLogger();
    if (typeof escapedText === "string") {
        return escapedText + "";
    }
    const msg =
        "No escaped text has been translated to string. Escaped text is only supported as string yet.";
    log.error(msg, { escapedText });
    throw new Error(msg);
}
