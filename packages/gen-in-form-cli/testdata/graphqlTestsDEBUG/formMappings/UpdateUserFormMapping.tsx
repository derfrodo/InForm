import { InFormMapping, OrderType } from "@derfrodo/gen-in-form-runtime";
import { UpdateUserInput as UpdateInput, GetMeQuery, Genders } from "../graphql/generated";
import { UserInputRestrictions, getRestrictionFunction } from "./UpdateUserRestrictions";
import { UserValidationRules, getValidationFunction } from "./UpdateUserValidation";

export interface UpdateUserFormMapping extends InFormMapping<UpdateInput, GetMeQuery["me"] & {}> {
    name: "UpdateUserForm"
    orderingType: OrderType<Order["me"] & {}>



    validationRules: UserValidationRules;
    getValidationFunction: typeof getValidationFunction;

    inputRestrictions: UserInputRestrictions;
    getInputRestrictionsFunction: typeof getRestrictionFunction;
}

export type Order = {
    me?: {
        // displayName: string, 
        firstName: string,
        lastName: string,
        gender: Genders,
        birthday: any,
        // age?: number | null,
        //   id: string,
    } | null
};
