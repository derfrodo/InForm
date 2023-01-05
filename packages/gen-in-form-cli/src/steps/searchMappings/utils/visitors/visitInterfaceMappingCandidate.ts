import {
    InFormGetInputRestrictionsFunctionPropertyName,
    InFormGetValidationFunctionPropertyName,
    InFormInputRestrictionsPropertyName,
    InFormNamePropertyName,
    InFormValidationRulesPropertyName,
} from "@src/common/constants";
import { getDeclarationForType } from "@src/common/utils/getDeclarationForType";
import { getDocFromInFormSourceFile } from "@src/common/utils/typescript/getDocFromInFormSourceFile";
import { getEscapedTextAsString } from "@src/common/utils/typescript/getEscapedTextAsString";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { InFormSourceFileAndFormMapping } from "@src/steps/searchMappings/types/InFormSourceFileAndFormMapping";
import ts from "typescript";
import { FormMappingData } from "../../types/FormMappingData";
import { getDefaultValuesTypeFromInFormMapping } from "./getDefaultValuesFromInFormMapping";
import {
    getDetailsTypeNode,
    isDetailsIndexedTypeNode,
} from "./getDetailsTypeNode";
import { getInputTypeNode } from "./getInputTypeNode";
import { getMemberValueTypeFromInFormMapping } from "./getMemberValueTypeFromInFormMapping";
import { getOrderingTypeFromInFormMapping } from "./getOrderingTypeFromInFormMapping";
import { visitInterfaceHeritageNodes } from "./visitInterfaceHeritageNodes";

export async function visitInterfaceMappingCandidate(
    node: ts.InterfaceDeclaration,
    context: InFormSourceFileAndFormMapping
): Promise<InFormSourceFileAndFormMapping> {
    const log = getGeneratorLogger();
    const { sourceFile } = context;
    const nextMappings = [...(context.mappings || [])];

    const { filepath } = sourceFile;
    const doc = getDocFromInFormSourceFile(sourceFile);
    const mappingInterfaceName = getEscapedTextAsString(node.name.escapedText);
    log.debug(`Test ${mappingInterfaceName} in ${filepath}.`);

    const inFormMapping = await visitInterfaceHeritageNodes(node, sourceFile);
    if (inFormMapping) {
        const inputType = await getInputTypeNode(inFormMapping, doc);
        const detailsType = await getDetailsTypeNode(inFormMapping, doc);
        const orderingType = await getOrderingTypeFromInFormMapping(
            inFormMapping,
            doc
        );
        const defaultValuesType = await getDefaultValuesTypeFromInFormMapping(
            inFormMapping
        );
        const nameValueType = await getMemberValueTypeFromInFormMapping(
            inFormMapping,
            InFormNamePropertyName,
            (node): node is ts.LiteralTypeNode => ts.isLiteralTypeNode(node)
        );
        const validationRulesValueType =
            await getMemberValueTypeFromInFormMapping(
                inFormMapping,
                InFormValidationRulesPropertyName,
                (node): node is ts.TypeNode => ts.isTypeNode(node)
            );
        const validationFunctionValueType =
            await getMemberValueTypeFromInFormMapping(
                inFormMapping,
                InFormGetValidationFunctionPropertyName,
                (node): node is ts.TypeQueryNode => {
                    const result = ts.isTypeQueryNode(node);
                    if (!result) {
                        log.error(
                            "Found validation function, but expected it to be type query for defined function"
                        );
                    }
                    return result;
                }
            );

        const inputRestrictionsValueType =
            await getMemberValueTypeFromInFormMapping(
                inFormMapping,
                InFormInputRestrictionsPropertyName,
                (node): node is ts.TypeNode => ts.isTypeNode(node)
            );
        const getInputRestrictionsFunctionValueType =
            await getMemberValueTypeFromInFormMapping(
                inFormMapping,
                InFormGetInputRestrictionsFunctionPropertyName,
                (node): node is ts.TypeQueryNode => {
                    const result = ts.isTypeQueryNode(node);
                    if (!result) {
                        log.error(
                            "Found restriction function, but expected it to be type query for defined function"
                        );
                    }
                    return result;
                }
            );

        const inputTypeDetails = getDeclarationForType(inputType);
        const detailsTypeDetails = getDeclarationForType(detailsType?.type);
        const indexedDetailsTypeDetails = isDetailsIndexedTypeNode(detailsType)
            ? getDeclarationForType(detailsType?.outerType)
            : null;

        const mappingInterface = node.getText(doc);

        log.info(`Working with ${mappingInterfaceName}`, {
            // detailsType,
            // detailsTypeDetails,
        });
        log.debug(`Found mapping in ${filepath}: ${mappingInterface}`);

        const data: FormMappingData = {
            mappingInterface: mappingInterface,
            mappingInterfaceName,
            mapNode: node,
            sourceFile: sourceFile,
            inputTypeDetails,
            detailsTypeDetails,
            indexedDetailsTypeDetails,
            orderingType,
            defaultValuesType,
            nameValueType,

            inputRestrictionsValueType,
            getInputRestrictionsFunctionValueType,

            validationRulesValueType,
            validationFunctionValueType,
        };

        nextMappings.push(data);
    }
    return { mappings: nextMappings, sourceFile };
}
