import {
    InFormDataTypeWithComponentTypeName,
    InFormDataTypeWithDefaultValueAndComponentTypeName,
    InFormDataTypeWithDefaultValueTypeName,
    InFormInFormDataTypeName,
    InFormInFormEnumDataTypeName,
    InFormRuntimeModuleName,
} from "@src/common/constants";
import {
    getOrCreateInFormsSourceFile,
    getOrCreateInFormsSourceFileFromNode,
} from "@src/common/utils/getOrCreateInFormsSourceFile";
import { debugTypescriptNode } from "@src/common/utils/logTypescriptNode";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logAndError } from "@src/logging/logAndThrow";
import { InFormGeneralSettingsData } from "@src/steps/searchGeneralSettings/types/InFormGeneralSettingsData";
import ts from "typescript";
import { findInFormInterfacesOfTypeDataExpression } from "../../../common/utils/typescript/findInFormInterfacesOfTypeDataExpression";
import { getTypeArgumentAt } from "../../../common/utils/typescript/getTypeArgumentAt";
import { resolveInFormInterfacesOfTypeDataExpression } from "../../../common/utils/typescript/resolveInFormInterfacesOfTypeDataExpression";
import { InFormEnumValue } from "../types/InFormEnumValue";
import {
    MappedSymbolForPropertyFromGeneralSetting,
    MappedSymbolInfo,
} from "../types/MappedSymbolForPropertyFromGeneralSetting";
import { PropertyMappingMatcher } from "../types/PropertyMappingMatcher";
import { getFilenameFromGeneralSettingsData } from "./getFilenameFromGeneralSettingsData";
import { getMappedSymbolInfo } from "./getMappedSymbolInfo";
import { getPropertyMappingMatcher } from "./getPropertyMappingMatcher";

async function getMatcher(
    matcher: ts.TypeNode,
    settings?: InFormGeneralSettingsData
): Promise<PropertyMappingMatcher | null> {
    const file = settings
        ? await getOrCreateInFormsSourceFile(
              getFilenameFromGeneralSettingsData(settings)
          )
        : await getOrCreateInFormsSourceFileFromNode(matcher);
    return getPropertyMappingMatcher(matcher, file);
}

async function findMatcher(
    matcher: ts.TypeNode | null | undefined,
    settings?: InFormGeneralSettingsData
): Promise<PropertyMappingMatcher | null> {
    if (!matcher) {
        return null;
    }
    return await getMatcher(matcher, settings);
}

function getDefaultForMappedPropertyFromGeneralSetting(
    defaultType: ts.TypeNode | null,
    mappingSymbolFromGeneralSettings: ts.Symbol
): MappedSymbolInfo | null {
    const log = getGeneratorLogger();
    if (defaultType === null) {
        log.debug(
            `No default value has been passed for symbol ${mappingSymbolFromGeneralSettings.getName()}`
        );
        return null;
    }

    if (defaultType) {
        const result = getMappedSymbolInfo(defaultType);
        log.debug("Mapped symbol info for default options", {
            defaultType,
            result,
        });

        return result;
    }

    log.info("No default value has been passed");
    debugTypescriptNode(defaultType);
    return null;
}

async function getMappedDataForEnumMapping(
    mappingSymbolFromGeneralSettings: ts.Symbol,
    settings: InFormGeneralSettingsData
): Promise<MappedSymbolForPropertyFromGeneralSetting> {
    const vt = await resolveInFormInterfacesOfTypeDataExpression(
        mappingSymbolFromGeneralSettings,
        InFormInFormEnumDataTypeName,
        InFormRuntimeModuleName
    );

    const args = vt.typeArguments || [];

    const type = getTypeArgumentAt(vt, 0);
    const input = getTypeArgumentAt(vt, 1);
    const defaultOption = getTypeArgumentAt(vt, 2);
    const matcher = args.length > 3 ? getTypeArgumentAt(vt, 3) : null;

    const result: MappedSymbolForPropertyFromGeneralSetting = {
        mappingSymbol: mappingSymbolFromGeneralSettings,
        mappingPropertySignatureKey: mappingSymbolFromGeneralSettings.name,
        fieldIdentifier: null,
        dataType: null,
        matcherForProperty: null,
        defaultValue: null,
        values: [],
        componentType: null,
    };
    result.fieldIdentifier = getMappedSymbolInfo(type);
    const inputsInfo = getMappedSymbolInfo(input);
    const inputsInfoSymbol = inputsInfo?.symbol;
    result.dataType = inputsInfo;
    const values: InFormEnumValue[] =
        typeof inputsInfoSymbol !== "string" &&
        inputsInfoSymbol &&
        inputsInfoSymbol.valueDeclaration &&
        ts.isEnumDeclaration(inputsInfoSymbol.valueDeclaration)
            ? inputsInfoSymbol.valueDeclaration.members.map((member) => ({
                  start: member.getStart(),
                  name: member.name.getText(),
                  value: member.initializer?.getText() ?? null,
                  fullName:
                      `${inputsInfoSymbol.name}.${member.name.getText()}` ??
                      null,
              }))
            : [];
    result.values = values.sort((a, b) => a.start - b.start);

    result.defaultValue = getDefaultForMappedPropertyFromGeneralSetting(
        defaultOption,
        mappingSymbolFromGeneralSettings
    );
    result.matcherForProperty = await findMatcher(matcher, settings);
    return result;
}

async function getMappedDataForDataMapping(
    mappingSymbolFromGeneralSettings: ts.Symbol,
    settings: InFormGeneralSettingsData,
    hasComponent = false
): Promise<MappedSymbolForPropertyFromGeneralSetting> {
    const vt = await resolveInFormInterfacesOfTypeDataExpression(
        mappingSymbolFromGeneralSettings,
        hasComponent
            ? InFormDataTypeWithComponentTypeName
            : InFormInFormDataTypeName,
        InFormRuntimeModuleName
    );

    const args = vt.typeArguments || [];

    const type = getTypeArgumentAt(vt, 0);
    const input = getTypeArgumentAt(vt, 1);
    const componentType = !hasComponent ? null : getTypeArgumentAt(vt, 2);
    const matcher = hasComponent
        ? args.length > 3
            ? getTypeArgumentAt(vt, 3)
            : null
        : args.length > 2
        ? getTypeArgumentAt(vt, 2)
        : null;

    const result: MappedSymbolForPropertyFromGeneralSetting = {
        mappingSymbol: mappingSymbolFromGeneralSettings,
        mappingPropertySignatureKey: mappingSymbolFromGeneralSettings.name,
        fieldIdentifier: null,
        dataType: null,
        matcherForProperty: null,
        defaultValue: null,
        values: [],
        componentType,
    };

    result.fieldIdentifier = getMappedSymbolInfo(type);
    result.dataType = getMappedSymbolInfo(input);

    result.matcherForProperty = await findMatcher(matcher, settings);

    return result;
}

async function getMappedDataForDataMappingWithDefaults(
    mappingSymbolFromGeneralSettings: ts.Symbol,
    settings: InFormGeneralSettingsData,
    hasComponent = false
): Promise<MappedSymbolForPropertyFromGeneralSetting> {
    const vt = await resolveInFormInterfacesOfTypeDataExpression(
        mappingSymbolFromGeneralSettings,
        hasComponent
            ? InFormDataTypeWithDefaultValueAndComponentTypeName
            : InFormDataTypeWithDefaultValueTypeName,
        InFormRuntimeModuleName
    );

    const args = vt.typeArguments || [];

    const type = getTypeArgumentAt(vt, 0);
    const input = getTypeArgumentAt(vt, 1);
    const defaultValue = args.length > 2 ? getTypeArgumentAt(vt, 2) : null;

    const componentType = !hasComponent ? null : getTypeArgumentAt(vt, 3);
    const matcher = hasComponent
        ? args.length > 4
            ? getTypeArgumentAt(vt, 4)
            : null
        : args.length > 3
        ? getTypeArgumentAt(vt, 3)
        : null;

    const result: MappedSymbolForPropertyFromGeneralSetting = {
        mappingSymbol: mappingSymbolFromGeneralSettings,
        mappingPropertySignatureKey: mappingSymbolFromGeneralSettings.name,
        fieldIdentifier: null,
        dataType: null,
        matcherForProperty: null,
        defaultValue: getDefaultForMappedPropertyFromGeneralSetting(
            defaultValue,
            mappingSymbolFromGeneralSettings
        ),
        values: [],
        componentType,
    };

    result.fieldIdentifier = getMappedSymbolInfo(type);
    result.dataType = getMappedSymbolInfo(input);

    result.matcherForProperty = await findMatcher(matcher, settings);
    return result;
}

/**
 * Resolves the symbol for given Type Mapping (@see InFormDataTypes in runtime)
 * @param mappingSymbolFromGeneralSettings
 * @param settings the general settings referencing to
 * @returns
 */
async function getMappingSymbolFromGeneralSettingsMappings(
    mappingSymbolFromGeneralSettings: ts.Symbol,
    settings: InFormGeneralSettingsData
): Promise<MappedSymbolForPropertyFromGeneralSetting> {
    if (
        await findInFormInterfacesOfTypeDataExpression(
            mappingSymbolFromGeneralSettings,
            InFormInFormEnumDataTypeName,
            InFormRuntimeModuleName
        )
    ) {
        return await getMappedDataForEnumMapping(
            mappingSymbolFromGeneralSettings,
            settings
        );
    } else if (
        await findInFormInterfacesOfTypeDataExpression(
            mappingSymbolFromGeneralSettings,
            InFormInFormDataTypeName,
            InFormRuntimeModuleName
        )
    ) {
        return await getMappedDataForDataMapping(
            mappingSymbolFromGeneralSettings,
            settings
        );
    } else if (
        await findInFormInterfacesOfTypeDataExpression(
            mappingSymbolFromGeneralSettings,
            InFormDataTypeWithDefaultValueTypeName,
            InFormRuntimeModuleName
        )
    ) {
        return await getMappedDataForDataMappingWithDefaults(
            mappingSymbolFromGeneralSettings,
            settings
        );
    } else if (
        await findInFormInterfacesOfTypeDataExpression(
            mappingSymbolFromGeneralSettings,
            InFormDataTypeWithComponentTypeName,
            InFormRuntimeModuleName
        )
    ) {
        return await getMappedDataForDataMapping(
            mappingSymbolFromGeneralSettings,
            settings,
            true
        );
    } else if (
        await findInFormInterfacesOfTypeDataExpression(
            mappingSymbolFromGeneralSettings,
            InFormDataTypeWithDefaultValueAndComponentTypeName,
            InFormRuntimeModuleName
        )
    ) {
        return await getMappedDataForDataMappingWithDefaults(
            mappingSymbolFromGeneralSettings,
            settings,
            true
        );
    } else {
        const msg = "No mapping found";
        throw logAndError(msg, { mappingSymbolFromGeneralSettings });
    }
}

/**
 * Resolves the symbols for Type Mappings (@see InFormDataTypes in runtime)
 * @param mappingSymbolFromGeneralSettings
 * @returns
 */
export async function getMappingSymbolsFromGeneralSettingsMappings(
    settings: InFormGeneralSettingsData
): Promise<MappedSymbolForPropertyFromGeneralSetting[]> {
    const mappedSymbols: MappedSymbolForPropertyFromGeneralSetting[] = [];
    const { argumentDeclarations } = settings;
    const generalSettingsMappings =
        argumentDeclarations.mappingType.properties || [];

    for (const m of generalSettingsMappings) {
        const mappingInfo = await getMappingSymbolFromGeneralSettingsMappings(
            m,
            settings
        );
        mappedSymbols.push(mappingInfo);
    }
    return mappedSymbols;
}
