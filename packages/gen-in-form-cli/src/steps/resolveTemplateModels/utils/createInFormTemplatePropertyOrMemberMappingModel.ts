import { getDeclarationForType } from "@src/common/utils/getDeclarationForType";
import { getEscapedTextAsString } from "@src/common/utils/typescript/getEscapedTextAsString";
import { getNameForProperty } from "@src/common/utils/typescript/getNameForProperty";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import { MappedMember } from "@src/steps/createFormModells/types/MappedMember";
import {
    isMappedProperty,
    MappedProperty,
} from "@src/steps/createFormModells/types/MappedProperty";
import ts from "typescript";
import { getRelativeImport } from "../../../common/utils/typescript/getRelativeImport";
import { FormModell } from "../../createFormModells/types/FormModell";
import { InFormTemplatePropertyOrMemberMappingModel } from "../types/InFormTemplatePropertyOrMemberMappingModel";
import { getMappedByTemplateModel } from "./getMappedByTemplateModel";
import { isKeywordTypeNode } from "../../../common/utils/typescript/isKeywordTypeNode";

/**
 * Returns true, if type is deemed "importworthy"
 * @param type
 * @returns
 */
function isImportworthyType(type: ts.TypeNode): boolean {
    let importMe = true;

    // Find reasons why not to import the type
    if (ts.isLiteralTypeNode(type)) {
        importMe = false;
    }

    if (ts.isUnionTypeNode(type)) {
        importMe = type.types.filter((t) => isImportworthyType(t)).length > 0;
    }

    if (isKeywordTypeNode(type)) {
        importMe = false;
    }

    return importMe;
}

export function createInFormTemplatePropertyOrMemberMappingModel(
    mappedMember: MappedMember | MappedProperty,
    model: FormModell
): InFormTemplatePropertyOrMemberMappingModel {
    const log = getGeneratorLogger();
    const { signature, mapped } = mappedMember;
    const { type, name: signatureName } = signature;
    const name = getNameForProperty(signatureName);
    const dec = getDeclarationForType(type);

    const relativeImport = dec?.sourceFile
        ? getRelativeImport(model.data.sourceFile.file, dec?.sourceFile)
        : null;
    log.debug("Member name resolved", {
        name,
        mappingName: model.data.mappingInterfaceName,
    });

    let typeName: string | null =
        type && ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal)
            ? type.literal.text
            : type?.getText() ?? "";
    let typeNameFull: string | null =
        type && ts.isLiteralTypeNode(type)
            ? typeName
            : dec?.baseTypeNode?.getText() ?? typeName;

    if (isMappedProperty(mappedMember)) {
        log.info("Resolve name for mapped member: ", { type: type?.getText() });
        typeName =
            type &&
            ts.isLiteralTypeNode(type) &&
            ts.isStringLiteral(type.literal)
                ? type.literal.text
                : type && isKeywordTypeNode(type)
                ? type?.getText() ?? ""
                : type &&
                  !ts.isUnionTypeNode(type) &&
                  !ts.isIntersectionTypeNode(type)
                ? getEscapedTextAsString(dec?.symbol?.escapedName)
                : type?.getText() ?? "";

        typeNameFull =
            type && ts.isLiteralTypeNode(type)
                ? typeName
                : type && isKeywordTypeNode(type)
                ? typeName
                : type &&
                  (ts.isUnionTypeNode(type) || ts.isIntersectionTypeNode(type))
                ? typeName
                : dec?.baseTypeNode?.getText() ?? null;
    }

    if (typeName === null || typeNameFull === null) {
        throw logAndError("No typename for member resolved", {
            name,
            mappingName: model.data.mappingInterfaceName,
            type,
            typeName,
            typeNameFull,
        });
    }

    if (relativeImport === null && type && isImportworthyType(type)) {
        log.warn("No relativeImport for member resolved", {
            name,
            mappingName: model.data.mappingInterfaceName,
            type: typeNameFull,
        });
        // throw new Error("No relative Import for property resolved");
    }
    const mappedBy = mapped.map((m) => getMappedByTemplateModel(m, model));
    const result: InFormTemplatePropertyOrMemberMappingModel = {
        propertyOrMemberModel: "propertyOrMemberModel",
        referencingModel: {
            absoluteFilePath: model.data.sourceFile.absoluteFilePath,
            file: model.data.sourceFile.filepath,
        },
        name,
        typeName,
        typeNameFull,
        relativeImport,
        mappedBy,
        firstMapping: mappedBy.length > 0 ? mappedBy[0] : null,
    };
    return result;
}
