import { FormModell } from "../../createFormModells/types/FormModell";
import { InFormTemplatePropertyOrMemberMappingModel } from "../types/InFormTemplatePropertyOrMemberMappingModel";
import { getPropertyMapping } from "./getPropertyMapping";
import { MergedImportTemplateModel } from "../types/MergedImportTemplateModel";
import { getMemberMapping } from "./getMemberMapping";
import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { AdditionalTypeInfo } from "../types/AdditionalTypeInfo";

export function getMergedImports(
    model: FormModell
): MergedImportTemplateModel[] {
    const log = getGeneratorLogger();
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

    const distinctMappedTypesImports = [
        ...mappedInputProperties,
        ...mappedDetailsProperties,
        ...mappedInputMembers,
        ...mappedDetailsMembers,
    ]
        .filter((i) => i.relativeImport !== null)
        .reduce<InFormTemplatePropertyOrMemberMappingModel[]>((p, c) => {
            if (
                p.find(
                    (v) =>
                        v.typeName === c.typeName &&
                        c.relativeImport === v.relativeImport
                )
            ) {
                return p;
            }
            return [...p, c];
        }, []);

    const distinctMappedComponentTypesImports = [
        ...mappedInputProperties,
        ...mappedDetailsProperties,
        ...mappedInputMembers,
        ...mappedDetailsMembers,
    ].reduce<AdditionalTypeInfo[]>((p, c) => {
        let next = p;
        let mappedByComponentTypes: AdditionalTypeInfo[] = [];
        if ((c.mappedBy?.length ?? 0) > 0) {
            mappedByComponentTypes = c.mappedBy
                .filter((v) => v.componentType)
                .map((v) => v.componentType) as AdditionalTypeInfo[];
        } else {
            log.info(`property: ${c.name} is not mapped`);
        }
        log.info(
            `Found ${mappedByComponentTypes.length} components mapped for "${c.name}"`
        );
        for (const mappedByComponentType of mappedByComponentTypes) {
            if (
                !next.find(
                    (v) =>
                        v.typeName === mappedByComponentType.typeName &&
                        v.importPath === mappedByComponentType.importPath
                )
            ) {
                next = [...next, mappedByComponentType];
            }
        }
        return next;
    }, []);

    const mappedComponents = distinctMappedComponentTypesImports.reduce<
        MergedImportTemplateModel[]
    >((p, c) => {
        if (c.importPath === null) {
            log.debug("skip entry due to no relative import", { c });
            return p;
        }
        const existing = p.find((v) => c.importPath === v.relativeImport);
        const current: MergedImportTemplateModel = {
            relativeImport: c.importPath,
            typeNames: [...(existing?.typeNames ?? []), c.typeName],
        };
        return existing
            ? [...p.filter((e) => e !== existing), current]
            : [...p, current];
    }, []);

    log.info("Found mapped components: ", {
        mappedComponents: JSON.stringify(mappedComponents),
        originalLength: distinctMappedComponentTypesImports.length,
    });

    const mergedImports = distinctMappedTypesImports.reduce<
        MergedImportTemplateModel[]
    >((p, c) => {
        if (c.relativeImport === null) {
            log.debug("skip entry due to no relative import", { c });
            return p;
        }
        const existing = p.find((v) => c.relativeImport === v.relativeImport);
        const current: MergedImportTemplateModel = {
            relativeImport: c.relativeImport,
            typeNames: [...(existing?.typeNames ?? []), c.typeName],
        };
        return existing
            ? [...p.filter((e) => e !== existing), current]
            : [...p, current];
    }, mappedComponents);
    return mergedImports;
}
