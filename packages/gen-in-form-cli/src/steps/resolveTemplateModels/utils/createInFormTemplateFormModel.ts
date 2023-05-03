import { InFormOrderingTypeFieldsPropertyName } from "@src/common/constants";
import { getNameForProperty } from "@src/common/utils/typescript/getNameForProperty";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import { FormMappingOrderingTypeInfoEx } from "@src/steps/searchMappings/types/FormMappingOrderingTypeInfo";
import ts, { SyntaxKind } from "typescript";
import { FormModell } from "../../createFormModells/types/FormModell";
import { AdditionalTypeInfo } from "../types/AdditionalTypeInfo";
import {
    InFormTemplateDefaultValuesMap,
    InFormTemplateFormModel,
} from "../types/InFormTemplateFormModel";
import { MatchingInFormTeplateMember } from "../types/MatchingInFormTeplateMember";
import { MergedImportTemplateModel } from "../types/MergedImportTemplateModel";
import { getDefaultValuesFromFormData } from "./getDefaultValuesFromFormData";
import { getInFormTemplateTypeInfoModel } from "./getInFormTemplateTypeInfoModel";
import { getMatchingMembersAndPropertiesByName } from "./getMatchingMembersAndPropertiesByName";
import { getMemberMapping } from "./getMemberMapping";
import { getMergedImports } from "./getMergedImports";
import { getPropertyMapping } from "./getPropertyMapping";
import { getTypeImportRelativePath } from "./getTypeImportRelativePath";
import { getTypeName } from "./getTypeName";
import path from "path";
import { getRelativeImport } from "@src/common/utils/typescript/getRelativeImport";

/**
 * Create Info for types like Validation / Restriction objects
 * @param type
 */
function createAdditionalTypeInfo(
    type: ts.TypeNode | null
): AdditionalTypeInfo | null {
    if (!type) {
        return null;
    }
    const importPath = getTypeImportRelativePath(type);

    const result: AdditionalTypeInfo = {
        isImported: importPath !== null,
        importPath,
        isTypeOf: false,
        typeName: getTypeName(type),
    };

    return result;
}

/**
 * Create Info for types like Validation / Restriction objects
 * @param type
 */
function createTypeofTypeInfo(
    type: ts.TypeQueryNode | null
): AdditionalTypeInfo | null {
    if (!type) {
        return null;
    }

    const importPath = getTypeImportRelativePath(type);
    const result: AdditionalTypeInfo = {
        isImported: importPath !== null,
        importPath,
        isTypeOf: true,
        typeName: getTypeName(type),
    };

    return result;
}

function getPropertyByName(
    node: ts.ObjectLiteralExpression,
    propertyName: string
): ts.ObjectLiteralElementLike | null {
    const fieldProperty = ts.isObjectLiteralExpression(node)
        ? node.properties.find(
              (p) => p.name && getNameForProperty(p.name) === propertyName
          )
        : null;
    if (fieldProperty === null) {
        logAndError(
            "Failed to find property by name in ObjectLiteralExpression node",
            { node, propertyName }
        );
    }

    return fieldProperty ?? null;
}

function getPropertyByNameFromAssignment(
    node: ts.ObjectLiteralElementLike,
    propertyName: string
): ts.ObjectLiteralElementLike | null {
    if (
        ts.isPropertyAssignment(node) &&
        ts.isObjectLiteralExpression(node.initializer)
    ) {
        const fieldProperty = getPropertyByName(node.initializer, propertyName);
        return fieldProperty;
    } else {
        logAndError("Failed to find property by name in assignment node", {
            node,
            propertyName,
        });
    }
    return null;
}

type OrderingField = {
    name: string;
    ordinal: number;
    isHidden?: boolean;
    groupName: null | string;
};
function getFieldsFromOrderByObjectLiteral(
    orderingType: FormMappingOrderingTypeInfoEx,
    inputPropertyNames: string[]
): OrderingField[] {
    const fieldProperty = getPropertyByName(
        orderingType.expression,
        InFormOrderingTypeFieldsPropertyName
    );

    if (
        fieldProperty &&
        ts.isPropertyAssignment(fieldProperty) &&
        fieldProperty.initializer &&
        ts.isObjectLiteralExpression(fieldProperty.initializer)
    ) {
        const fields = fieldProperty.initializer.properties.map((prop) => {
            const isHidden = getPropertyByNameFromAssignment(prop, "isHidden");
            const ordinal = getPropertyByNameFromAssignment(prop, "ordinal");
            const groupName = getPropertyByNameFromAssignment(
                prop,
                "groupName"
            );

            return {
                name: prop.name ? getNameForProperty(prop.name) : null,
                ordinal:
                    ordinal !== null &&
                    ts.isPropertyAssignment(ordinal) &&
                    ordinal.initializer &&
                    ts.isLiteralExpression(ordinal.initializer) &&
                    ordinal.initializer.kind === SyntaxKind.NumericLiteral
                        ? Number(ordinal.initializer.text)
                        : null,
                isHidden:
                    isHidden !== null &&
                    ts.isPropertyAssignment(isHidden) &&
                    isHidden.initializer
                        ? isHidden.initializer.kind === SyntaxKind.TrueKeyword
                            ? true
                            : isHidden.initializer.kind ===
                              SyntaxKind.FalseKeyword
                            ? false
                            : null
                        : null,
                groupName:
                    groupName !== null &&
                    ts.isPropertyAssignment(groupName) &&
                    groupName.initializer &&
                    ts.isLiteralExpression(groupName.initializer) &&
                    groupName.initializer.kind === SyntaxKind.StringLiteral
                        ? groupName.initializer.text
                        : null,
            };
        });
        if (
            fields.filter(
                (f) =>
                    f.name === null ||
                    f.ordinal === null ||
                    Number.isNaN(f.ordinal)
            ).length > 0
        ) {
            const log = getGeneratorLogger();
            log.warn(
                "Evaluate ordering infos: Fields contain either null for name or ordinal.",
                { fields: JSON.stringify(fields), orderingType }
            );
        }

        const missingFields = inputPropertyNames.filter((fieldName) =>
            fields.every((q) => q.name !== fieldName)
        );

        return [
            ...fields.map((f) =>
                f.ordinal === null
                    ? { ...f, ordinal: Number.MAX_SAFE_INTEGER }
                    : f
            ),
            ...missingFields.map((fieldName) => ({
                name: fieldName,
                ordinal: Number.MAX_SAFE_INTEGER,
                isHidden: false,
            })),
        ].filter((f) => !f.isHidden) as unknown as OrderingField[];
    } else {
        throw logAndError(
            "Failed to evaluate ordering infos. Assumed object literal, but got something different",
            { orderingType }
        );
    }
}

export function createInFormTemplateFormModel(
    model: FormModell
): InFormTemplateFormModel {
    const log = getGeneratorLogger();

    const { data } = model;
    const modelName = data.mapNode.name.escapedText ?? "";
    log.info("Create template model", modelName);

    const mappedInputProperties = getPropertyMapping(
        model,
        "mappedInputProperties"
    );
    const mappedDetailsProperties = getPropertyMapping(
        model,
        "mappedDetailsProperties"
    );

    const mappedInputMembers = getMemberMapping(model, "mappedInputMembers");
    const mappedDetailsMembers = getMemberMapping(
        model,
        "mappedDetailsMembers"
    );

    const matchingMembers = getMatchingMembersAndPropertiesByName(model);

    const inputsWithMatchingDetails: MatchingInFormTeplateMember[] = [
        ...mappedInputProperties,
        ...mappedInputMembers,
    ].map(
        (member) =>
            matchingMembers.find(
                (match) => match.input && match.input.name === member.name
            ) ?? { input: member, detail: null }
    );
    const detailsWithoutInputs = [
        ...mappedDetailsProperties,
        ...mappedDetailsMembers,
    ].filter((detail) => {
        const result = !matchingMembers.find(
            (match) => match.detail && match.detail.name === detail.name
        );
        return result;
    });
    const inputsWithoutDetails = inputsWithMatchingDetails
        .filter((m) => m.input && !m.detail)
        .map((m) => m.input);

    const mergedImports = getMergedImports(model);
    const detailsTypeInfo = model.data.indexedDetailsTypeDetails
        ? getInFormTemplateTypeInfoModel(model, "indexedDetailsTypeDetails")
        : model.data.detailsTypeDetails
        ? getInFormTemplateTypeInfoModel(model, "detailsTypeDetails")
        : null;

    let byOrdering: Partial<MatchingInFormTeplateMember>[] = [];
    if (model.data.orderingType) {
        if (model.data.orderingType.type === null) {
            const fields = getFieldsFromOrderByObjectLiteral(
                model.data.orderingType,
                [
                    ...inputsWithMatchingDetails
                        .filter((i) => i.input)
                        .map((i) => i.input.name ?? ""),
                    ...inputsWithMatchingDetails
                        .filter((i) => i.input === null && i.detail)
                        .map((i) => i.detail?.name ?? ""),
                ].filter((n) => n !== "")
            );

            byOrdering = fields
                .sort((f1, f2) => f1.ordinal - f2.ordinal)
                .map((m) => {
                    const name = m.name;

                    const onlyDetalDetail = detailsWithoutInputs.find(
                        (d) => d.name === name
                    );
                    const inputWithMatchingDetail =
                        inputsWithMatchingDetails.find(
                            (d) => d.input.name === name
                        );
                    const inputWithoutDetail = inputsWithoutDetails.find(
                        (d) => d.name === name
                    );
                    const result =
                        inputWithMatchingDetail ??
                        (onlyDetalDetail
                            ? { detail: onlyDetalDetail }
                            : { input: inputWithoutDetail });
                    return result;
                });
        } else if (ts.isTypeLiteralNode(model.data.orderingType.type)) {
            byOrdering = model.data.orderingType.type.members.map((m) => {
                const name = m.name?.getText();

                const onlyDetalDetail = detailsWithoutInputs.find(
                    (d) => d.name === name
                );
                const inputWithMatchingDetail = inputsWithMatchingDetails.find(
                    (d) => d.input.name === name
                );
                const inputWithoutDetail = inputsWithoutDetails.find(
                    (d) => d.name === name
                );
                const result =
                    inputWithMatchingDetail ??
                    (onlyDetalDetail
                        ? { detail: onlyDetalDetail }
                        : { input: inputWithoutDetail });
                return result;
            });
        } else {
            log.warn(
                "Failed to resolve ordering. Please use indexed types for now (see demo webapp)"
            );
        }
    }

    const defaultValues: InFormTemplateDefaultValuesMap =
        getDefaultValuesFromFormData(model);

    const name = model.data.nameValueType
        ? model.data.nameValueType.literal.kind === ts.SyntaxKind.StringLiteral
            ? model.data.nameValueType.literal.text
            : model.data.nameValueType.literal.getText()
        : null;

    const inputRestrictionsValueType = createAdditionalTypeInfo(
        data.inputRestrictionsValueType
    );
    const getInputRestrictionsFunctionValueType = createTypeofTypeInfo(
        data.getInputRestrictionsFunctionValueType
    );

    const validationRulesValueType = createAdditionalTypeInfo(
        data.validationRulesValueType
    );
    const validationFunctionValueType = createTypeofTypeInfo(
        data.validationFunctionValueType
    );

    const mergedadditionalImports = [
        inputRestrictionsValueType,
        getInputRestrictionsFunctionValueType,
        validationRulesValueType,
        validationFunctionValueType,
    ].reduce((p: MergedImportTemplateModel[], c) => {
        if (c?.isImported && c.importPath !== null) {
            const next = p.filter(
                (item) => item.relativeImport !== c.importPath
            );
            const value: MergedImportTemplateModel = p.find(
                (item) => item.relativeImport === c.importPath
            ) ?? { relativeImport: c.importPath, typeNames: [] };

            return [
                ...next,
                { ...value, typeNames: [...value.typeNames, c.typeName] },
            ];
        }
        return p;
    }, []);

    const sourceFile = data.mapNode.getSourceFile().fileName;
    const generalSettingsSourceFile =
        model.generalSettings.sourceFile.file.fileName;
    const inFormTemplateFormModel: InFormTemplateFormModel = {
        interfaceName: modelName,
        name: name ?? modelName,
        sourceFile: sourceFile,
        sourceDirectory: path.dirname(sourceFile),
        sourceDirectoryName: path.basename(path.dirname(sourceFile)),
        generalSettings: {
            sourceFile: generalSettingsSourceFile,
            sourceDirectory: path.dirname(generalSettingsSourceFile),
            sourceDirectoryName: path.basename(
                path.dirname(generalSettingsSourceFile)
            ),
            relativeImport: getRelativeImport(
                data.mapNode.getSourceFile(),
                model.generalSettings.sourceFile.file
            ),
            relativePath: path.dirname(
                getRelativeImport(
                    data.mapNode.getSourceFile(),
                    model.generalSettings.sourceFile.file
                ) ?? ""
            ),
        },

        inputTypeInfo: getInFormTemplateTypeInfoModel(
            model,
            "inputTypeDetails"
        ),
        detailsTypeInfo,

        mappedInputProperties,
        mappedDetailsProperties,
        mappedInputMembers,
        mappedDetailsMembers,
        mergedImports,
        matchingMembers,

        detailsWithoutInputs,
        inputsWithMatchingDetails,
        inputsWithoutDetails,

        byOrdering,
        defaultValues,
        // imports: model.mapping.sourceFile.imports.imports,

        inputRestrictionsValueType,
        getInputRestrictionsFunctionValueType,

        validationRulesValueType,
        validationFunctionValueType,

        mergedadditionalImports,
    };
    return inFormTemplateFormModel;
}
