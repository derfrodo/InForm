import { readFile } from "fs";
import { Template } from "handlebars";
import { promisify } from "util";

export async function readTemplate(filePath: string): Promise<Template> {
    return await promisify(readFile)(filePath, {
        encoding: "utf8",
    });
}
