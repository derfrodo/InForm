import { GetRestrictionFunction } from "@derfrodo/gen-in-form-runtime";
import { UpdateUserInput } from "../graphql/generated";

type UserInputRestriction = {
    readonly: boolean;
};

export type UserInputRestrictions = {
    [key in keyof UpdateUserInput]: UserInputRestriction;
};

export type UserInputRestrictionsResult = UserInputRestriction | null

// by changing this to "use..." you might get a react hook :)
export const getRestrictionFunction: GetRestrictionFunction<
    UserInputRestrictions,
    UpdateUserInput,
    keyof UpdateUserInput,
    UserInputRestrictionsResult
> = (u) => {
    return (u2: keyof UpdateUserInput) => {
        const restriction = u[u2];
        if (!restriction) {
            return null;
        }
        return restriction
    };
};
