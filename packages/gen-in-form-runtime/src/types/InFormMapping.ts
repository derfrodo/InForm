import { DefaultValues } from "./DefaultValues";
import { FieldOverrides } from "./FieldOverrides";
import { GetRestrictionFunction } from "./GetRestrictionFunction";
import { GetValidationFunction } from "./GetValidationFunction";
import { GroupAndOrderTypes } from "./GroupAndOrderTypes";
import { PartialKeyToKeyMap } from "./PartialKeyToKeyMap";

export interface InFormMapping<
    InputType extends {},
    DetailsType extends {} = InputType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TValidationRules extends {} = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TInputRestrictions extends {} = any,
    TGroupAndOrderTypes extends InputType = InputType,
    TEvaluateResult = {}
> {
    name: string;

    input: InputType;
    details: DetailsType;

    /**
     * If you want to set the order for the fields for the form, you might want to consider using this property to do so ;)
     * Kindly note, that as of now, only fields with keys based on strings are allowed
     */
    groupAndOrderFields: GroupAndOrderTypes<TGroupAndOrderTypes>;

    /**
     * So if you want to overwrite default values for specific Properties, use this Property by declaring a (literal structure) type or interface to be passed as generic Parameter
     * to the interface {@link DefaultValues}. Only declare the properties, you want to be set to a specific default value.
     * e.g. type InputType = {name: string}, then you might declare this in your implementation as type CreateDefault = {name:"Bernd"} and {... defaultValues: DefaultValues<CreateDefault> }.
     * Kindly note, that inform will test for the {@link DefaultValues} first, so dont forget to use it ;)
     */
    defaultValues: DefaultValues<Partial<InputType>>;

    /**
     * Rules for Input field behavior like "required", "min/max", "length"...
     * this makes validation possible for a: Runtime and b: compile time depending on the template
     */
    validationRules: TValidationRules;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValidationFunction: GetValidationFunction<TValidationRules, InputType, any>;

    /**
     * Rules for Input field behavior like "readonly", "hidden"
     * might be based on auth - so this also solves the "authorization-issue" of the bachelor degree
     */
    inputRestrictions: TInputRestrictions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getInputRestrictionsFunction: GetRestrictionFunction<TInputRestrictions, InputType, any>;

    // Not Implemented!

    fieldOverrides: FieldOverrides<InputType | DetailsType>;

    detailsToInputMappings: PartialKeyToKeyMap<DetailsType, InputType>;

    /**
     * If true and no mapping in Input props => show as readonly
     */
    readonlyDetailsProp: { [key in keyof DetailsType]: boolean };

    /**
     * If true => show as readonly
     */
    readonlyInputProp: { [key in keyof InputType]: boolean };

    /**
     * Some input type, to "overwrite" types by naming conventions or typescript types
     */
    inputTypeOverrides: { [key in keyof InputType]: TEvaluateResult };
}
