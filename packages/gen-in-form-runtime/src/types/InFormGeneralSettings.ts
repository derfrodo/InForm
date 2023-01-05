import { InFormPropertyMatcher, InFormPropertyMatcherTypes } from "./InFormPropertyMatcher";

/**
 * Declares the input and output data type and assigns it to a key (string)
 * This key can be used later for mapping, converting and generting (like "which output partial shall I take?")
 * Types will get mapped by TTypeToBeMapped
 */
export interface InFormDataType<
    TKey extends string,
    TTypeToBeMapped,
    TMatcher extends InFormPropertyMatcher<InFormPropertyMatcherTypes> | null = null
> {
    /**
     * in Bachelor Thesis: "Feldidentifikator"
     */
    key: TKey;
    inputData: TTypeToBeMapped;
    matcher: TMatcher;

    defaultValue: TTypeToBeMapped;
    // In Future: Here may be some kind of regex added for additional decisions by property names of input objects?
}

export interface InFormDataTypeWithDefaultValue<
    TKey extends string,
    TTypeToBeMapped,
    TDefaultValue,
    TMatcher extends InFormPropertyMatcher<InFormPropertyMatcherTypes> | null = null
> extends InFormDataType<TKey, TTypeToBeMapped, TMatcher> {
    key: TKey;
    inputData: TTypeToBeMapped;
    matcher: TMatcher;

    defaultValue: TTypeToBeMapped;
    // In Future: Here may be some kind of regex added for additional decisions by property names of input objects?
}

export interface InFormDataTypeWithComponent<
    TKey extends string,
    TTypeToBeMapped,
    TComponent,
    TMatcher extends InFormPropertyMatcher<InFormPropertyMatcherTypes> | null = null
> extends InFormDataType<TKey, TTypeToBeMapped, TMatcher> {
    key: TKey;
    inputData: TTypeToBeMapped;
    matcher: TMatcher;

    component: TComponent;
    defaultValue: TTypeToBeMapped;
    // In Future: Here may be some kind of regex added for additional decisions by property names of input objects?
}

export interface InFormDataTypeWithDefaultValueAndComponent<
    TKey extends string,
    TTypeToBeMapped,
    TDefaultValue,
    TComponent,
    TMatcher extends InFormPropertyMatcher<InFormPropertyMatcherTypes> | null = null
> extends InFormDataType<TKey, TTypeToBeMapped, TMatcher> {
    key: TKey;
    inputData: TTypeToBeMapped;
    matcher: TMatcher;

    component: TComponent;
    defaultValue: TTypeToBeMapped;
    // In Future: Here may be some kind of regex added for additional decisions by property names of input objects?
}

/**
 * DataType for mapping values which are given as typescript enums (e.g. for selections)
 */
export interface InFormEnumDataType<
    TKey extends string,
    TTypeToBeMapped extends string | number,
    TDefaultValue,
    TMatcher extends InFormPropertyMatcher<InFormPropertyMatcherTypes> | null = null
> extends InFormDataType<TKey, TTypeToBeMapped, TMatcher> {
    /**
     * Sets the default option (if declared by extending this interface)
     */
    defaultOption: TDefaultValue;
}

/**
 * The Map / Dictionary for all input/output/key mappings for data types
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InFormDataTypes<TPropKey extends string = string, TKey extends string = string> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in TKey]: InFormDataType<TPropKey, any, any>;
};

export interface InFormGeneralSettings<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TFormElementForDataType extends InFormDataTypes<any>,
    TAdditional extends {} | null = null
> {
    formElementForDataType: TFormElementForDataType;

    /**
     * Type of properies which will be passed to forms aditionally.
     * This may also include validation methods alongsite with methods for forms to save and cancel
     */
    additionalProperties: TAdditional;
}

// THE FOLLOWING NOT FOR GENERAL MAPPING, RIGHT?
interface PropertyToOutputMapping<TProp, Desc extends PropertyDescription<TProp>, TOut> {
    Output: TOut;
}

type PropertyDescription<T> = {
    propertyType: T;
    propertyName: string;
};
