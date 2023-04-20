
export type InnerObject = {
    data: string;
    complex?: InnerObject;
}

export type ObjectWithComplexProperties = {
    simple: string;
    property: InnerObject;
};
