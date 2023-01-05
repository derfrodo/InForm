import ts from "typescript";

export type InFormTemplateTypeInfoModel = {
    typeName: ts.__String | undefined;
    namedBinding: string | ts.__String | undefined;
    file: string | undefined;
    text: string | null;
};
