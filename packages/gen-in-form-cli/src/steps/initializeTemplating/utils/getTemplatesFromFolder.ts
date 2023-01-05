import { logAndError } from "@src/logging/logAndThrow";
import { readdir, stat, Dirent, Stats } from "fs";
import path from "path";
import { promisify } from "util";
import { getGeneratorLogger } from "../../../logging/getGeneratorLogger";
import { InFormHandlebarTemplate } from "../types/InFormHandlebarTemplate";
import { readTemplate } from "./readTemplate";

const extension = ".handlebars";
const extensionLength = extension.length;

async function getTemplateFromFile(
    file: Stats | Dirent,
    name: string,
    basefolder: string
): Promise<InFormHandlebarTemplate> {
    const log = getGeneratorLogger();

    if (
        file.isFile() &&
        name.toLowerCase().lastIndexOf(extension) ===
            name.length - extensionLength
    ) {
        const templateName = name.substring(0, name.length - extensionLength);
        try {
            const fullFile = path.join(basefolder, name);
            log.info(`Found template "${templateName}" in file "${fullFile}".`);

            const data: InFormHandlebarTemplate = {
                name: templateName,
                filepath: fullFile,
                template: await readTemplate(fullFile),
            };
            return data;
            // result.push(data);
            // handlebars.registerPartial(
            //     partialName,
            //     await readTemplate(path.join(basefolder, name))
            // );
        } catch (err) {
            log.error(`Resolving template "${templateName}" failed.`, {
                error: err,
            });
            throw err;
        }
    } else {
        throw logAndError(
            `Failed to resolve template for file ${name} in ${basefolder}`,
            { file, name, basefolder, extension }
        );
    }
}

export async function getTemplatesFromFolder(
    basefolder: string,
    recursive = false
): Promise<InFormHandlebarTemplate[]> {
    const log = getGeneratorLogger();
    log.info(`Search in ${basefolder} for templates`);
    const files = await promisify(readdir)(basefolder, { withFileTypes: true });

    const result: InFormHandlebarTemplate[] = [];
    for (const file of files) {
        const { name } = file;

        if (
            file.isFile() &&
            name.toLowerCase().lastIndexOf(extension) ===
                name.length - extensionLength
        ) {
            result.push(await getTemplateFromFile(file, name, basefolder));
        } else if (file.isDirectory() && recursive) {
            result.push(
                ...(await getTemplatesFromFolder(
                    path.join(basefolder, name),
                    recursive
                ))
            );
        }
    }
    return result;
}

export async function getTemplatesFromFileOrFolder(
    fileOrFolder: string,
    recursive = false
): Promise<InFormHandlebarTemplate[]> {
    const statInfo = await promisify(stat)(fileOrFolder);
    if (statInfo.isFile()) {
        const basePath = path.dirname(fileOrFolder);
        const basename = path.basename(fileOrFolder);
        return [await getTemplateFromFile(statInfo, basename, basePath)];
    } else {
        return await getTemplatesFromFolder(fileOrFolder, recursive);
    }
}
